import { useId, useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Link,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import BookshelfCard from 'src/components/Card/BookshelfCard';

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
];
const books = [
  {
    id: 1,
    title: 'Book 1',
    image_url_l: 'https://picsum.photos/200/300',
    image_url_m: 'https://picsum.photos/200/300',
    image_url_s: 'https://picsum.photos/200/300',
    genres: ['Action'],
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
    <Container maxW="100%" pl={10} py={6}>
      <Stack spacing={10}>
        <Text as="h2">Popular Bookshelves</Text>
        <Box width="100%" my="6">
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
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
                <GridItem key={bookshelf.id} w="100%">
                  <BookshelfCard
                    bookshelf={bookshelf}
                    forked={forked}
                    owner={owner}
                    user={user}
                    disabled={false}
                    onDeleteFork={() => {}}
                    onFork={() => {}}
                  />
                </GridItem>
              );
            })}
          </Grid>
        </Box>
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
          <Grid templateColumns="repeat(5, 1fr)" gap={4}>
            {books?.map((book) => (
              <GridItem key={book.id} w="100%" h="100%">
                <Card w="100%" h="100%">
                  <CardBody>
                    <Image
                      w="100%"
                      src={book.image_url_l}
                      alt={book.title}
                      bgColor="teal.300"
                      borderRadius={4}
                    />
                    <Text mt={4}>{book.title}</Text>
                    {book.genres.map((genre) => (
                      <Tag key={uuid} size="sm" mr={2} mt={2}>
                        {genre}
                      </Tag>
                    ))}
                  </CardBody>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Box>

        <Box>
          <Text as="h2" textAlign="center">
            Recomended Bookshelves
          </Text>
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
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
                <GridItem key={bookshelf.id} w="100%">
                  <BookshelfCard
                    bookshelf={bookshelf}
                    forked={forked}
                    owner={owner}
                    user={user}
                    disabled={false}
                    onDeleteFork={() => {}}
                    onFork={() => {}}
                  />
                </GridItem>
              );
            })}
          </Grid>
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
