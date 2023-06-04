import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Card,
  Image,
  Link,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Navigate, Link as ReachLink } from 'react-router-dom';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import logo from 'src/shared/assets/images/ohara_l.png';
import { useUserStore } from 'src/flux/store/user.store';
import { useAuthStore } from 'src/flux/store';
import * as API from 'src/api';
import Loading from '../Preloader/Loading';
import { PAGE_PATH } from 'src/shared/constants';

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const { user, setUser, setInitialUser } = useUserStore();
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const {
    isOpen: isLoading,
    onOpen: onLoading,
    onClose: onLoaded,
  } = useDisclosure();

  const onLoginSuccess = async (credentialResponse: CredentialResponse) => {
    onLoading();
    const { credential } = credentialResponse;
    try {
      if (!credential) throw new Error('error');

      localStorage.setItem('access_token', credential);

      const { data } = await API.authAPI.login();
      localStorage.setItem('access_token', data.access_token);

      const { data: user } = await API.userAPI.getMe();

      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem('access_token');
      setInitialUser();
      setIsAuthenticated(false);
    } finally {
      onLoaded();
    }
  };

  const onLoginFailed = () => {
    localStorage.removeItem('access_token');
    setInitialUser();
    setIsAuthenticated(false);
    <Navigate to={PAGE_PATH.MAIN} />;
  };

  if (isLoading) return <Loading message="loading user..." />;

  return (
    <VStack
      h="100vh"
      p={8}
      gap={8}
      display={isOpen ? 'flex' : 'none'}
      transition={'all ease 0.3s'}
    >
      <Link as={ReachLink} to={PAGE_PATH.MAIN}>
        <Image w="48" src={logo} />
      </Link>

      {isAuthenticated ? (
        <>
          <Link as={ReachLink} to={PAGE_PATH.PROFILE}>
            <Card
              p="6"
              width="100%"
              alignItems="center"
              justifyContent="center"
              bg="transparent"
              transition="all 0.2s ease-in-out"
              _hover={{
                bg: 'blackAlpha.300',
              }}
            >
              <Avatar
                size="lg"
                name={`${user.firstName} ${user.lastName}`}
                src={user.profileImgUrl}
                mb="4"
              />
              <Text
                as="h3"
                fontSize="lg"
                fontWeight="bold"
              >{`${user.firstName} ${user.lastName}`}</Text>
              <Text
                fontSize="sm"
                fontWeight="semibold"
              >{`${user.totalForks} Fork`}</Text>
            </Card>
          </Link>

          <Box w="100%" flexGrow={1} overflow={'auto'}>
            <Accordion allowToggle width="100%">
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Public Bookshelf
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {user?.bookshelves?.public ? (
                    user?.bookshelves?.public?.map((bookshelf) => (
                      <Text key={bookshelf.id}>
                        <Link
                          as={ReachLink}
                          to={PAGE_PATH.USER_BOOKSHELF(bookshelf.id)}
                        >
                          {bookshelf.name}
                        </Link>
                      </Text>
                    ))
                  ) : (
                    <Text>Empty</Text>
                  )}
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Private Bookshelf
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {user?.bookshelves?.private ? (
                    user?.bookshelves?.private?.map((bookshelf) => (
                      <Text key={bookshelf.id}>
                        <Link
                          as={ReachLink}
                          to={PAGE_PATH.USER_BOOKSHELF(bookshelf.id)}
                        >
                          {bookshelf.name}
                        </Link>
                      </Text>
                    ))
                  ) : (
                    <Text>Empty</Text>
                  )}
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Forked Bookshelf
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {user?.forkedshelves?.length ? (
                    user.forkedshelves.map((forkedshelf) => (
                      <Text
                        key={forkedshelf.id}
                        _hover={{
                          background: 'gray.900',
                        }}
                      >
                        <Link
                          as={ReachLink}
                          to={PAGE_PATH.BOOKSHELF(forkedshelf.bookshelfId)}
                        >
                          {forkedshelf?.bookshelf?.name}
                        </Link>
                      </Text>
                    ))
                  ) : (
                    <Text>Empty</Text>
                  )}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
          <Button onClick={onLoginFailed} colorScheme="red">
            logout
          </Button>
        </>
      ) : (
        <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginFailed} />
      )}
    </VStack>
  );
};

export default Sidebar;
