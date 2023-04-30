import { useParams, Link as ReachLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import DeleteBookshelfModal from '../components/Modal/DeleteBookshelfModal';
import ChangeVisibleModal from '../components/Modal/ChangeVisibleModal';
import AddBookModal from '../components/Modal/AddBookModal';
import { useBookshelfStore, useUserStore } from 'src/flux/store';
import Error from 'src/components/Error/Error';
import { Visibility } from 'src/shared/interfaces';
import * as API from 'src/api';
import { useEffect } from 'react';
import Loading from 'src/components/Preloader/Loading';
import BookCard from 'src/components/Card/BookCard';
import { PAGE_PATH } from 'src/shared/constants';

type UpdateBookshelf = {
  name?: string;
  description?: string;
  visible?: Visibility;
  books?: string[];
};

export default function UserBookshelf() {
  const { bookshelfId } = useParams();
  const navigate = useNavigate();

  const { bookshelf, setBookshelf } = useBookshelfStore();
  const { updateUserBookshelves, deleteUserBookshelf } = useUserStore();

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
    isOpen: loading,
    onOpen: setLoading,
    onClose: setLoaded,
  } = useDisclosure();

  const addBooksHandler = async (
    selectedBooks: { value: string; label: string }[]
  ) => {
    if (!bookshelfId) return;
    if (!bookshelf) return;
    setLoading();
    try {
      const newBookshelf = {
        ...bookshelf,
        books: selectedBooks.map((x) => x.value),
      };

      const { data } = await API.userAPI.updateUserBookshelf(
        bookshelfId,
        newBookshelf
      );

      setBookshelf(data);
      updateUserBookshelves(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoaded();
      onAddBookClose();
    }
  };

  const updateUserBookshelfHandler = async (bookshelfData: UpdateBookshelf) => {
    if (!bookshelfId) return;
    if (!bookshelf) return;
    setLoading();
    try {
      const { data } = await API.userAPI.updateUserBookshelf(
        bookshelfId,
        bookshelfData
      );
      setBookshelf(data);
      updateUserBookshelves(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoaded();
      onCloseStatus();
    }
  };

  const removeBookHandler = async (bookId: string) => {
    if (!bookshelfId) return;
    if (!bookshelf) return;
    setLoading();
    try {
      const { data } = await API.userAPI.removeUserBookshelfBook(
        bookshelfId,
        bookId
      );

      const newBookshelf = {
        ...bookshelf,
        books: bookshelf.books.filter((x) => x.book.id !== data.bookId),
      };

      setBookshelf(newBookshelf);
      updateUserBookshelves(newBookshelf);
    } catch (error) {
      console.error(error);
    } finally {
      setLoaded();
      onAddBookClose();
    }
  };

  const deleteBookshelfHandler = async () => {
    if (!bookshelf?.id) return;

    setLoading();
    try {
      const { data } = await API.userAPI.deleteUserBookshelf(bookshelf?.id);
      deleteUserBookshelf(data.bookshelfId);
    } catch (error) {
      console.error(error);
    } finally {
      navigate(PAGE_PATH.PROFILE);
      onCloseDelete();
      setLoaded();
    }
  };

  useEffect(() => {
    const fetchBookshelf = async () => {
      if (!bookshelfId) return;

      setLoading();
      try {
        const { data } = await API.userAPI.getUserBookshelf(bookshelfId);
        setBookshelf(data);
      } catch (error) {
        navigate(PAGE_PATH.PROFILE);
      } finally {
        setLoaded();
      }
    };

    fetchBookshelf();
  }, [bookshelfId, setBookshelf, setLoaded, setLoading]);

  if (!bookshelf) return <Error />;
  if (loading) return <Loading />;

  return (
    <>
      <Container minW='100%' pl={10} py={8}>
        <Stack gap={6}>
          <Heading textAlign='center'>{bookshelf.name}</Heading>
          <HStack justifyContent='center' gap={6}>
            <Text>Total Book: {bookshelf._count?.books || 0}</Text>
            <Text>Total Fork: {bookshelf._count?.userForks || 0}</Text>
          </HStack>

          <Flex flexDir='row' gap={6}>
            <Flex w='100%' flexDir='column' gap={6}>
              <Box maxH={60} overflow='auto'>
                <Text as='p' textAlign='center'>
                  {bookshelf.description}
                </Text>
              </Box>
              <Flex
                flexDir={['column', 'row']}
                gap={6}
                alignSelf='center'
                mt='auto'
              >
                <Button
                  variant='solid'
                  colorScheme='teal'
                  onClick={onOpenStatus}
                >
                  Set as{' '}
                  {bookshelf.visible === Visibility.PUBLIC
                    ? 'Private'
                    : 'Public'}{' '}
                  Bookshelf
                </Button>
                <Button
                  variant='solid'
                  colorScheme='red'
                  onClick={onOpenDelete}
                >
                  Delete Bookshelf
                </Button>
              </Flex>
            </Flex>
          </Flex>

          <Flex w='100%' justifyContent='center'>
            <Button
              variant='outline'
              colorScheme='teal'
              onClick={onAddBookOpen}
            >
              Add Book
            </Button>
          </Flex>

          <Grid
            w='100%'
            templateColumns={[
              'repeat(2, 1fr)',
              'repeat(2, 1fr)',
              'repeat(3, 1fr)',
              'repeat(4, 1fr)',
            ]}
            gap={6}
          >
            {bookshelf.books.map(({ book }) => (
              <GridItem key={book.id} position='relative' role='group'>
                <Box>
                  <BookCard
                    id={book.id}
                    author={book.author}
                    title={book.title}
                    image_url_l={book.image_url_l}
                    genres={book.genres}
                  />
                </Box>
                <Box
                  right='0'
                  top='0'
                  display='none'
                  position='absolute'
                  p={1}
                  borderRadius='sm'
                  _groupHover={{
                    display: 'block',
                  }}
                  _hover={{
                    color: 'red.500',
                    bg: 'red.100',
                    cursor: 'pointer',
                  }}
                  onClick={() => removeBookHandler(book.id)}
                >
                  <DeleteIcon fontSize={24} />
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Stack>
      </Container>

      <ChangeVisibleModal
        isOpen={isStatusOpen}
        onClose={onCloseStatus}
        footer={
          <Button
            colorScheme='blue'
            mr={3}
            onClick={() =>
              updateUserBookshelfHandler({
                visible:
                  bookshelf.visible === Visibility.PUBLIC
                    ? Visibility.PRIVATE
                    : Visibility.PUBLIC,
              })
            }
          >
            Change To{' '}
            {bookshelf.visible === Visibility.PUBLIC ? 'Private' : 'Public'}
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
        name={bookshelf.name}
        isOpen={isDeleteOpen}
        onClose={onCloseDelete}
        onClick={deleteBookshelfHandler}
      />
    </>
  );
}
