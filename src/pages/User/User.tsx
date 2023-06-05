import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Container,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from 'src/flux/store';
import * as API from 'src/api';
import { IUserProfile } from 'src/shared/interfaces';
import Loading from 'src/components/Preloader/Loading';
import BookshelfTable from '../Profile/components/Table/BookshelfTable';

export default function User() {
  const { user: currentUser } = useUserStore();
  const { userId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IUserProfile | null>(null);

  useEffect(() => {
    if (userId === currentUser?.id) {
      navigate('/profile');
    }
  }, [currentUser?.id, navigate, userId]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        navigate('/404');
        return;
      }

      setIsLoading(true);
      try {
        const { data } = await API.userAPI.getUserById(userId);

        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate, userId]);

  if (isLoading) {
    return <Loading />;
  }

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
      </Box>

      <Container maxW="100%">
        <Stack gap="10">
          <VStack>
            <Text
              as={'h1'}
              fontSize="2xl"
              fontWeight="bold"
              mt="4"
              textAlign="center"
            >
              {`${user?.firstName} ${user?.lastName}`}
            </Text>

            <HStack spacing="24px" justifyContent="center">
              <Text>Total Fork: {user?._count.forkedshelves}</Text>
              <Text>Total Bookshelf: {user?._count.bookshelves}</Text>
            </HStack>
          </VStack>

          {user?.bookshelves.length === 0 ? (
            <Text textAlign="center" mt={6}>
              User has no public bookshelf
            </Text>
          ) : (
            <BookshelfTable
              data={user?.bookshelves?.length ? user?.bookshelves : []}
            />
          )}
        </Stack>
      </Container>
    </>
  );
}
