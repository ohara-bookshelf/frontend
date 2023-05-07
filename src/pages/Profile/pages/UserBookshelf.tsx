import { useParams, useNavigate } from 'react-router-dom';
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
import { useBookshelfStore, useUserStore } from 'src/flux/store';
import Error from 'src/components/Error/Error';
import {
  ICreateBookshelf,
  IUpdateBookshelf,
  Visibility,
} from 'src/shared/interfaces';
import * as API from 'src/api';
import { useEffect } from 'react';
import Loading from 'src/components/Preloader/Loading';
import BookCard from 'src/components/Card/BookCard';
import { PAGE_PATH } from 'src/shared/constants';
import BookshelfFormModal from '../components/Modal/BookshelfFormModal';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { IoPencilOutline } from 'react-icons/io5';

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
    isOpen: isUpdateFormOpen,
    onOpen: onUpdateFormOpen,
    onClose: onUpdateFormClose,
  } = useDisclosure();
  const {
    isOpen: loading,
    onOpen: setLoading,
    onClose: setLoaded,
  } = useDisclosure();

  const updateBooksHandler = async (newBookshelf: ICreateBookshelf) => {
    if (!bookshelfId) return;
    if (!bookshelf) return;
    setLoading();
    try {
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
      onUpdateFormClose();
    }
  };

  const updateUserBookshelfHandler = async (
    bookshelfData: IUpdateBookshelf
  ) => {
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
      onUpdateFormClose();
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

  const isPublic = bookshelf?.visible || Visibility.PUBLIC;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookshelfId, setBookshelf, setLoaded, setLoading]);

  if (!bookshelf) return <Error />;
  if (loading) return <Loading />;

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
            <Flex w="100%" flexDir="column" gap={6}>
              <Box maxH={60} overflow="auto">
                <Text as="p" textAlign="center">
                  {bookshelf.description}
                </Text>
              </Box>
              <Flex
                flexDir={['column', 'row']}
                gap={6}
                alignSelf="center"
                mt="auto"
              >
                <Button
                  variant="solid"
                  colorScheme="facebook"
                  onClick={onUpdateFormOpen}
                  leftIcon={<IoPencilOutline />}
                >
                  Update Bookshelf
                </Button>
                <Button
                  variant="outline"
                  colorScheme="facebook"
                  onClick={onOpenStatus}
                  leftIcon={isPublic ? <IoMdEyeOff /> : <IoMdEye />}
                >
                  Set as {isPublic ? 'Private' : 'Public'} Bookshelf
                </Button>
              </Flex>
            </Flex>
          </Flex>

          <Flex w="100%" justifyContent="center">
            <Button
              size={'sm'}
              variant="solid"
              colorScheme="red"
              onClick={onOpenDelete}
              leftIcon={<MdDelete />}
            >
              Delete Bookshelf
            </Button>
          </Flex>

          <Grid
            w="100%"
            templateColumns={[
              'repeat(2, 1fr)',
              'repeat(2, 1fr)',
              'repeat(3, 1fr)',
              'repeat(4, 1fr)',
            ]}
            gap={6}
          >
            {bookshelf.books.map(({ book }) => (
              <GridItem key={book.id}>
                <Box>
                  <BookCard book={book} />
                </Box>
                <Box
                  right="0"
                  top="0"
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
            colorScheme="blue"
            mr={3}
            onClick={() =>
              updateUserBookshelfHandler({
                description: bookshelf.description,
                name: bookshelf.name,

                visible: isPublic ? Visibility.PRIVATE : Visibility.PUBLIC,
              })
            }
          >
            Change To {isPublic ? 'Private' : 'Public'}
          </Button>
        }
      />

      <BookshelfFormModal
        initialFormValues={{
          name: bookshelf.name,
          description: bookshelf.description,
          visible: bookshelf.visible,
          books: bookshelf.books.map(({ book }) => book.id),
        }}
        initialSelectedBooks={bookshelf.books.map(({ book }) => ({
          value: book.id,
          label: book.title,
        }))}
        isOpen={isUpdateFormOpen}
        onClose={onUpdateFormClose}
        submitHandler={updateBooksHandler}
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
