import React, { useEffect, useState } from 'react';
import { useParams, Link as ReachLink, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import * as api from '../../../api';
import logo from '../../../shared/assets/images/bookshelf.png';

import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import Loading from '../../../components/PreLoader/Loading';
import DeleteBookshelfModal from '../components/Modal/DeleteBookshelfModal';
import ChangeVisibleModal from '../components/Modal/ChangeVisibleModal';
import AddBookModal from '../components/Modal/AddBookModal';

const UserBookshelf = () => {
  const queryClient = useQueryClient('user');
  const navigate = useNavigate();
  const { bookshelfId } = useParams();

  const [book, setBook] = useState({});

  const {
    isOpen: isStatusOpen,
    onOpen: onOpenStatus,
    onClose: onCloseStatus,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const {
    isOpen: isAddBookOpen,
    onOpen: onAddBookOpen,
    onClose: onAddBookClose,
  } = useDisclosure();

  const {
    data: bookshelf,
    isLoading,
    error,
    refetch,
  } = useQuery(
    'user/bookshelf',
    () => api.getUserBookshelfDetail(bookshelfId),
    {
      onSuccess: (data) => {
        setBook(data?.books[0]?.book || {});
      },
      onError: (error) => {
        return error.response;
      },
    }
  );

  const updateBookshelf = useMutation(api.updateBookshelf, {
    onSuccess: () => {
      queryClient.invalidateQueries('user/bookshelf');
      queryClient.invalidateQueries('user');
    },
  });

  const deleteBookshelf = useMutation(api.deleteBookshelf, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
      navigate('/profile');
    },
  });

  const onChangeBookshelfStatus = () => {
    const visible = bookshelf.visible === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC';
    updateBookshelf.mutate({ param: bookshelfId, body: { visible } });
    onCloseStatus();
  };

  const onDeleteBookshelf = () => {
    deleteBookshelf.mutate(bookshelfId);
    onCloseDelete();
  };

  const addBooksHandler = (books) => {
    const bookIds = books.map((book) => book.value);
    updateBookshelf.mutate({ param: bookshelfId, body: { books: bookIds } });
    onAddBookClose();
  };

  useEffect(() => {
    if (bookshelfId) {
      refetch();
    }
  }, [bookshelfId, refetch]);

  if (isLoading || updateBookshelf.isLoading || deleteBookshelf.isLoading)
    return <Loading />;

  if (error) {
    return <Text>error</Text>;
  }

  return (
    <>
      <Container minW="100%" pl={10} py={8}>
        <Stack gap={6}>
          <Heading textAlign="center">{bookshelf.name}</Heading>
          <HStack justifyContent="center" gap={6}>
            <Text>Total Book: {bookshelf._count?.books || 0}</Text>
            <Text>Total Fork: {bookshelf._count?.userForks || 0}</Text>
          </HStack>

          <Flex flexDir="row" gap={6}>
            <Flex w="100%" justifyContent="center">
              <Image
                h={80}
                src={book.image_url_l || logo}
                alt={book.title || 'bookshelf'}
                objectFit="cover"
              />
            </Flex>
            <Flex w="100%" h={80} flexDir="column" gap={6}>
              <Box maxH={60} overflow="auto">
                <Text as="p" textAlign="center">
                  {bookshelf.description}
                </Text>
              </Box>
              <HStack gap={6} alignSelf="center" mt="auto">
                <Button
                  variant="solid"
                  colorScheme="teal"
                  onClick={onOpenStatus}
                >
                  Set as{' '}
                  {bookshelf.visible === 'PRIVATE' ? 'Public' : 'Private'}{' '}
                  Bookshelf
                </Button>
                <Button
                  variant="solid"
                  colorScheme="red"
                  onClick={onOpenDelete}
                >
                  Delete Bookshelf
                </Button>
              </HStack>
            </Flex>
          </Flex>

          <Flex w="100%" justifyContent="center">
            <Button
              variant="outline"
              colorScheme="teal"
              onClick={onAddBookOpen}
            >
              Add Book
            </Button>
          </Flex>

          <Grid w="100%" templateColumns="repeat(4, 1fr)" gap={6}>
            {bookshelf.books.map(({ book }) => (
              <GridItem
                key={book.id}
                borderRadius="sm"
                transition="all 0.3s ease-in-out"
                position="relative"
                _hover={{
                  cursor: 'pointer',
                  bg: 'blackAlpha.300',
                }}
                role="group"
              >
                <Box
                  right="0"
                  display="none"
                  position="absolute"
                  p={1}
                  borderRadius="sm"
                  _groupHover={{
                    display: 'block',
                  }}
                  _hover={{
                    color: 'red.500',
                    bg: 'red.100',
                  }}
                >
                  <DeleteIcon fontSize={24} />
                </Box>
                <Link as={ReachLink} to={`/books/${book.id}`}>
                  <HStack>
                    <Image
                      w={32}
                      h={32}
                      src={book.image_url_l}
                      alt={book.title}
                      objectFit="contain"
                    />
                    <Box h={32}>
                      <Text>{book.title}</Text>
                    </Box>
                  </HStack>
                </Link>
              </GridItem>
            ))}
          </Grid>
        </Stack>
      </Container>

      <ChangeVisibleModal
        isOpen={isStatusOpen}
        onClose={onCloseStatus}
        footer={
          <Button colorScheme="blue" mr={3} onClick={onChangeBookshelfStatus}>
            Change To {bookshelf.visible === 'PRIVATE' ? 'Public' : 'Private'}
          </Button>
        }
      />

      <AddBookModal
        isOpen={isAddBookOpen}
        onClose={onAddBookClose}
        defaultState={bookshelf.books.map(({ book }) => ({
          value: book.id,
          label: book.title,
        }))}
        addBooksHandler={addBooksHandler}
      />

      <DeleteBookshelfModal
        isOpen={isDeleteOpen}
        onClose={onCloseDelete}
        onClick={onDeleteBookshelf}
      />
    </>
  );
};

export default UserBookshelf;
