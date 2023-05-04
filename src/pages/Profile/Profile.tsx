import { useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Image,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';

import { useUserStore } from 'src/flux/store/user.store';
import * as API from 'src/api';
import Loading from 'src/components/Preloader/Loading';
import { ICreateBookshelf, Visibility } from 'src/shared/interfaces';

import BookshelfTable from './components/Table/BookshelfTable';
import ForkedshelfTable from './components/Table/ForkedshelfTable';
import CreateBookshelfModal from './components/Modal/CreateBookshelfModal';

const Profile = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: loading,
    onOpen: onLoading,
    onClose: onLoaded,
  } = useDisclosure();

  const { user, setInitialUser, setUser, addUserBookshelf } = useUserStore();

  const initialFormValues: ICreateBookshelf = {
    name: '',
    description: '',
    visible: Visibility.PUBLIC,
    books: [],
  };

  const submitHandler = async (formValues: ICreateBookshelf) => {
    try {
      const { data } = await API.userAPI.createBookshelf(formValues);
      addUserBookshelf(data);
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  const fetchUser = async () => {
    onLoading();
    try {
      const { data } = await API.userAPI.getMe();

      setUser(data);
    } catch (error) {
      setInitialUser();
      navigate('/');
    } finally {
      onLoaded();
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading message="loading user" />;

  return (
    <>
      <Box>
        <Image
          bg="teal.500"
          h="260px"
          w="100%"
          src="https://images.unsplash.com/photo-1419640303358-44f0d27f48e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1385&q=80"
          objectFit="cover"
        />
        <Box position="relative" mb={16}>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <Avatar
              size="xl"
              name={`${user?.firstName} ${user?.lastName}`}
              src={user?.profileImgUrl}
              border="2px solid teal"
            />
          </Box>
        </Box>
        <Container maxW="100%">
          <Stack gap="10">
            <Text
              as={'h1'}
              fontSize="2xl"
              fontWeight="bold"
              mt="4"
              textAlign="center"
            >
              {`${user?.firstName} ${user?.lastName}`}
            </Text>

            <Flex flexDir={['column', 'row']} justifyContent="center" gap="8">
              <Button
                rightIcon={<AddIcon />}
                colorScheme="facebook"
                variant="outline"
                onClick={onOpen}
              >
                Create New Bookshelf
              </Button>
              <Button
                rightIcon={<FaCamera />}
                colorScheme="facebook"
                variant="solid"
                onClick={() => navigate('/profile/mood-assistant')}
              >
                Mood Assistant
              </Button>
            </Flex>

            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>Public</Tab>
                <Tab>Private</Tab>
                <Tab>Forked</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {user?.bookshelves?.public?.length === 0 ? (
                    <Text textAlign="center" mt={6}>
                      No bookshelf found
                    </Text>
                  ) : (
                    <BookshelfTable
                      data={
                        user?.bookshelves?.public?.length
                          ? user?.bookshelves?.public
                          : []
                      }
                    />
                  )}
                </TabPanel>
                <TabPanel>
                  {user?.bookshelves?.private?.length === 0 ? (
                    <Text textAlign="center" mt={6}>
                      No bookshelf found
                    </Text>
                  ) : (
                    <BookshelfTable
                      data={
                        user?.bookshelves?.private?.length
                          ? user?.bookshelves?.private
                          : []
                      }
                    />
                  )}
                </TabPanel>
                <TabPanel>
                  {user?.forkedshelves?.length === 0 ? (
                    <Text textAlign="center" mt={6}>
                      No bookshelf found
                    </Text>
                  ) : (
                    <ForkedshelfTable data={user?.forkedshelves || []} />
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Container>
      </Box>

      <CreateBookshelfModal
        initialFormValues={initialFormValues}
        isOpen={isOpen}
        onClose={onClose}
        submitHandler={submitHandler}
      />
    </>
  );
};

export default Profile;
