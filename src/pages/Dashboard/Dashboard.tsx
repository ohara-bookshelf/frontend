import { useId, useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Link,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import BookshelfCard from 'src/components/Card/BookshelfCard';
import DashboardSection from './components/DashboardSection/DashboardSection';
import BookCard from 'src/components/Card/BookCard';
import { IBook } from 'src/shared/interfaces';

const user: any = {};
const bookshelves = [
  {
    id: 1,
    name: 'Bookshelf 1',
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
  },
  {
    id: 1,
    name: 'Bookshelf 1',
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
  },
  {
    id: 1,
    name: 'Bookshelf 1',
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
  },
  {
    id: 1,
    name: 'Bookshelf 1',
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
  },
  {
    id: 1,
    name: 'Bookshelf 1',
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
  },
  {
    id: 1,
    name: 'Bookshelf 1',
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
  },
  {
    id: 1,
    name: 'Bookshelf 1',
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
  },
  {
    id: 1,
    name: 'Bookshelf 1',
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
  },
];
const books = [
  {
    id: '1',
    title: 'Book 1',
    image_url_l: 'https://picsum.photos/200/300',
    image_url_m: 'https://picsum.photos/200/300',
    image_url_s: 'https://picsum.photos/200/300',
    genres: ['Action', 'Action', 'Action', 'Action', 'Action', 'Action'],
    isbn: '123',
    author: '123',
    year_of_publication: 2000,
    publisher: '123',
    description: '123',
  },
  {
    id: '1',
    title: 'Book 1',
    image_url_l: 'https://picsum.photos/200/300',
    image_url_m: 'https://picsum.photos/200/300',
    image_url_s: 'https://picsum.photos/200/300',
    genres: ['Action', 'Action', 'Action', 'Action', 'Action', 'Action'],
    isbn: '123',
    author: '123',
    year_of_publication: 2000,
    publisher: '123',
    description: '123',
  },
  {
    id: '1',
    title: 'Book 1',
    image_url_l: 'https://picsum.photos/200/300',
    image_url_m: 'https://picsum.photos/200/300',
    image_url_s: 'https://picsum.photos/200/300',
    genres: ['Action', 'Action', 'Action', 'Action', 'Action', 'Action'],
    isbn: '123',
    author: '123',
    year_of_publication: 2000,
    publisher: '123',
    description: '123',
  },
  {
    id: '1',
    title: 'Book 1',
    image_url_l: 'https://picsum.photos/200/300',
    image_url_m: 'https://picsum.photos/200/300',
    image_url_s: 'https://picsum.photos/200/300',
    genres: ['Action', 'Action', 'Action', 'Action', 'Action', 'Action'],
    isbn: '123',
    author: '123',
    year_of_publication: 2000,
    publisher: '123',
    description: '123',
  },
  {
    id: '1',
    title: 'Book 1',
    image_url_l: 'https://picsum.photos/200/300',
    image_url_m: 'https://picsum.photos/200/300',
    image_url_s: 'https://picsum.photos/200/300',
    genres: ['Action', 'Action', 'Action', 'Action', 'Action', 'Action'],
    isbn: '123',
    author: '123',
    year_of_publication: 2000,
    publisher: '123',
    description: '123',
  },
  {
    id: '1',
    title: 'Book 1',
    image_url_l: 'https://picsum.photos/200/300',
    image_url_m: 'https://picsum.photos/200/300',
    image_url_s: 'https://picsum.photos/200/300',
    genres: ['Action', 'Action', 'Action', 'Action', 'Action', 'Action'],
    isbn: '123',
    author: '123',
    year_of_publication: 2000,
    publisher: '123',
    description: '123',
  },
];
const recommendBookshelves = [...bookshelves];

export default function Dashboard() {
  const uuid = useId();

  const [bookTitles, setBookTitles] = useState([
    'Maniac Magee',
    'The Outsiders',
    'Lassie Come-Home',
    'The Sign of Four',
  ]);
  return (
    <Container maxW="100%">
      <Stack spacing={10}>
        <Text as="h2">Popular Bookshelves</Text>
        <DashboardSection>
          {bookshelves.slice(0, 12).map((bookshelf) => {
            const owner = bookshelf.owner.id === user?.id;
            const forked = user?.forkedshelves?.some(
              // @ts-ignore
              (item) => item.bookshelfId === bookshelf.id
            );
            const forkId = user?.forkedshelves?.find(
              // @ts-ignore
              (item) => item.bookshelfId === bookshelf.id
            )?.id;

            return (
              <BookshelfCard
                key={bookshelf.id}
                bookshelf={bookshelf}
                forked={forked}
                owner={owner}
                user={user}
                disabled={false}
                onDeleteFork={() => {}}
                onFork={() => {}}
              />
            );
          })}
        </DashboardSection>
        <Flex justifyContent="center">
          <Link
            as={ReachLink}
            to="/bookshelves"
            fontSize="xl"
            color="teal"
            textDecor="underline"
          >
            See all bookshelves
          </Link>
        </Flex>
        <Box>
          <Text as="h2" textAlign="center">
            Recomended Books
          </Text>
          <DashboardSection>
            {books?.map((book) => (
              <BookCard key={book.id} book={book} />
              // <Card w="100%" h="100%">
              //   <CardBody>
              //     <Image
              //       w="100%"
              //       src={book.image_url_l}
              //       alt={book.title}
              //       bgColor="teal.300"
              //       borderRadius={4}
              //     />
              //     <Text mt={4}>{book.title}</Text>
              //     {book.genres.map((genre) => (
              //       <Tag key={uuid} size="sm" mr={2} mt={2}>
              //         {genre}
              //       </Tag>
              //     ))}
              //   </CardBody>
              // </Card>
            ))}
          </DashboardSection>
        </Box>

        <Box>
          <Text as="h2" textAlign="center">
            Recomended Bookshelves
          </Text>
          <DashboardSection>
            {recommendBookshelves?.map((bookshelf) => {
              const owner = bookshelf.owner.id === user?.id;
              const forked = user?.forkedshelves?.some(
                // @ts-ignore
                (item) => item.bookshelfId === bookshelf.id
              );
              const forkId = user?.forkedshelves?.find(
                // @ts-ignore
                (item) => item.bookshelfId === bookshelf.id
              )?.id;

              return (
                <BookshelfCard
                  key={bookshelf.id}
                  bookshelf={bookshelf}
                  forked={forked}
                  owner={owner}
                  user={user}
                  disabled={false}
                  onDeleteFork={() => {}}
                  onFork={() => {}}
                />
              );
            })}
          </DashboardSection>
        </Box>
      </Stack>
    </Container>
  );
}

// const { data: user } = useQuery('user', api.getUserDetail, {
//   onSuccess: ({ bookshelves, forkedshelves }) => {
//     let books = [];

//     forkedshelves.forEach(({ bookshelf }) => {
//       bookshelf.books.forEach(({ book }) => {
//         books.push(book.title);
//       });
//     });

//     Object.keys(bookshelves).forEach((key) => {
//       bookshelves[key].forEach(({ books }) => {
//         books.forEach(({ book }) => {
//           books.push(book.title);
//         });
//       });
//     });

//     setBookTitles(books);
//   },
// });

// const {
//   data: books,
//   error: recommendBookError,
//   isLoading: isRecomBookFetching,
//   refetch: refetchBooks,
// } = useQuery(
//   'books',
//   () =>
//     api.getRecommededBooks(bookTitles[randomIndex(bookTitles.length)], 20),
//   {
//     initialData: [],
//   }
// );

// const {
//   data: recommendBookshelves,
//   error: recommendBookshelfError,
//   isLoading: isRecomBookshelfFetching,
//   refetch: refetchBookshelves,
// } = useQuery(
//   'bookshelves/recommend',
//   () =>
//     api.getRecommededBookshelves(
//       bookTitles[randomIndex(bookTitles.length)],
//       20
//     ),
//   {
//     initialData: [],
//   }
// );

// const { mutate: deleteForkedBookshelf, isLoading: isDeleting } = useMutation(
//   api.deleteForkedBookshelf,
//   {
//     onSuccess: () => {
//       queryClient.invalidateQueries('user');
//     },
//   }
// );

// const { mutate: forkBookshelf, isLoading: isForking } = useMutation(
//   api.forkBookshelf,
//   {
//     onSuccess: () => {
//       queryClient.invalidateQueries('user');
//     },
//   }
// );
