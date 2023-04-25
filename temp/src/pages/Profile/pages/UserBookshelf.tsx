import { useEffect, useState } from 'react';
import { useParams, Link as ReachLink, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import logo from 'src/shared/assets/images/bookshelf.png';
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
import DeleteBookshelfModal from '../components/Modal/DeleteBookshelfModal';
import ChangeVisibleModal from '../components/Modal/ChangeVisibleModal';
import AddBookModal from '../components/Modal/AddBookModal';

const book = {
  id: 1,
  title: 'Book 1',
  image_url_l: 'https://picsum.photos/200',
};

const bookshelf = {
  id: 1,
  name: 'Bookshelf',
  description: 'This is a bookshelf.',
  visible: 'PRIVATE',
  owner: {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
  },
  _count: {
    books: 10,
    userForks: 10,
  },
  createdAt: '2021-10-10T00:00:00.000Z',
  books: [book],
};

const UserBookshelf = () => {
  const navigate = useNavigate();
  const { bookshelfId } = useParams();

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
            {/*  @ts-ignore */}
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
                  onClick={() => console.log(book.id)}
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
          <Button colorScheme="blue" mr={3} onClick={() => {}}>
            Change To {bookshelf.visible === 'PRIVATE' ? 'Public' : 'Private'}
          </Button>
        }
      />

      <AddBookModal
        isOpen={isAddBookOpen}
        onClose={onAddBookClose}
        //  @ts-ignore
        defaultState={bookshelf.books.map(({ book }) => ({
          value: book.id,
          label: book.title,
        }))}
        addBooksHandler={() => {}}
      />

      <DeleteBookshelfModal
        name={bookshelf.name}
        isOpen={isDeleteOpen}
        onClose={onCloseDelete}
        onClick={() => {}}
      />
    </>
  );
};

export default UserBookshelf;
