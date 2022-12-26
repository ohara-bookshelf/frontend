import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
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

import BookshelfTable from './components/Table/BookshelfTable';
import ForkedshelfTable from './components/Table/ForkedshelfTable';

import * as api from '../../api';
import { AddIcon } from '@chakra-ui/icons';
import CreateBookshelfModal from './components/Modal/CreateBookshelfModal';
import Loading from '../../components/PreLoader/Loading';
import { initialFormValues } from '../../shared/constants/initialValues';

const Profile = () => {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery('user', api.getUserDetail);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const createBookshelf = useMutation(api.createBookshelf, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
  });

  const submitHandler = (formValues) => {
    createBookshelf.mutate(formValues);
    onClose();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {createBookshelf.isLoading ? (
        <Loading message="Creating Your Bookshelf" />
      ) : null}
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
        <Container maxW="100%" pl={10}>
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

            <Flex justifyContent="center">
              <Button
                rightIcon={<AddIcon />}
                colorScheme="teal"
                variant="outline"
                onClick={onOpen}
              >
                Create New Bookshelf
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
                  <BookshelfTable
                    data={
                      user?.bookshelves?.private?.length
                        ? user?.bookshelves?.private
                        : []
                    }
                  />
                </TabPanel>
                <TabPanel>
                  <ForkedshelfTable data={user?.forkedshelves || []} />
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
