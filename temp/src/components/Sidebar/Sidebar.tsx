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
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import logo from 'src/shared/assets/images/bookshelf.png';

const user: any = {};

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  // const queryClient = useQueryClient();
  // const navigate = useNavigate();

  // const { data: user, refetch: refetchUser } = useQuery(
  //   'user',
  //   api.getUserDetail,
  //   {
  //     onError: () => {
  //       localStorage.removeItem('access_token');
  //       navigate('/', { replace: true });
  //       queryClient.setQueryData('user', () => null);
  //     },
  //   }
  // );

  const onLoginSuccess = async () => {
    // localStorage.setItem('access_token', credential);
    // try {
    //   const { data } = await api.login();
    //   localStorage.setItem('access_token', data.access_token);
    //   refetchUser();
    // } catch (error) {
    //   localStorage.removeItem('access_token');
    //   queryClient.setQueryData('user', () => null);
    //   navigate('/', { replace: true });
    // }
  };

  const onLoginFailed = () => {
    // localStorage.removeItem('access_token');
    // queryClient.setQueryData('user', () => null);
    // navigate('/', { replace: true });
  };

  // // check if user is logged in previously
  // useState(() => {
  //   refetchUser();
  // }, []);

  return (
    <VStack
      h="100vh"
      py={8}
      gap={8}
      display={isOpen ? 'flex' : 'none'}
      transition={'all ease 0.3s'}
    >
      <Link as={ReachLink} to="/">
        <Image w="16" src={logo} />
      </Link>

      {user ? (
        <>
          <Link as={ReachLink} to="/profile">
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
              >{`${user.totalFork} Fork`}</Text>
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
                    // @ts-ignore
                    user?.bookshelves?.public?.map((bookshelf) => (
                      <Text key={bookshelf.id}>
                        <Link as={ReachLink} to={`/profile/${bookshelf.id}`}>
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
                    // @ts-ignore
                    user?.bookshelves?.private?.map((bookshelf) => (
                      <Text key={bookshelf.id}>
                        <Link as={ReachLink} to={`/profile/${bookshelf.id}`}>
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
                    // @ts-ignore
                    user.forkedshelves.map((forkedShelf) => (
                      <Text key={forkedShelf.id}>
                        <Link
                          as={ReachLink}
                          to={`/bookshelves/${forkedShelf.bookshelf.id}`}
                        >
                          {forkedShelf.bookshelf.name}
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
      {/* {user ? (
        
      ) : (
        <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginFailed} />
      )}
      {user && (
        <>
          
        </>
      )} */}
    </VStack>
  );
};

export default Sidebar;
