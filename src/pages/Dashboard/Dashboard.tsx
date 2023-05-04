import { useEffect, useState } from 'react';
import { Box, Container, Stack, Text } from '@chakra-ui/react';
import BookshelfCard from 'src/components/Card/BookshelfCard';
import DashboardSection from './components/DashboardSection/DashboardSection';
import BookCard from 'src/components/Card/BookCard';
import { IBook, IBookshelf } from 'src/shared/interfaces';
import * as API from 'src/api';

export default function Dashboard() {
  const [popular, setPopular] = useState<IBookshelf[]>([]);
  const [recommended, setRecommended] = useState<IBookshelf[]>([]);
  const [books, setBooks] = useState<IBook[]>([]);
  const [fetchingPopular, setFetchingPopular] = useState(false);
  const [fetchingRecommended, setFetchingRecommended] = useState(false);
  const [fetchingBooks, setFetchingBooks] = useState(false);

  useEffect(() => {
    const fetchPopularShelves = async () => {
      setFetchingPopular(true);
      const queryString = new URLSearchParams({
        take: '10',
        owner: 'true',
        userForks: 'true',
        _count: 'true',
      }).toString();

      try {
        const { data } = await API.bookshelfAPI.getPopular(queryString);
        setPopular(data);
      } catch (error) {
        setPopular([]);
      } finally {
        setFetchingPopular(false);
      }
    };

    fetchPopularShelves();
  }, []);

  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      setFetchingBooks(true);
      try {
        const { data } = await API.bookAPI.getRecommendation('The Testament');
        setBooks(data);
      } catch (error) {
        console.error(error);
        setBooks([]);
      } finally {
        setFetchingBooks(false);
      }
    };

    fetchRecommendedBooks();
  }, []);

  useEffect(() => {
    const fetchRecommendedBookshelves = async () => {
      setFetchingRecommended(true);
      try {
        const { data } = await API.bookshelfAPI.getRecommendation(
          'The Testament'
        );
        setRecommended(data);
      } catch (error) {
        console.error(error);
        setRecommended([]);
      } finally {
        setFetchingRecommended(false);
      }
    };

    fetchRecommendedBookshelves();
  }, []);

  return (
    <Container maxW="100%" py="8">
      <Stack spacing={10} textAlign={'center'}>
        <Text as="h2">Popular Bookshelves</Text>
        {fetchingPopular ? (
          <Text>Fetching Popular...</Text>
        ) : (
          <DashboardSection>
            {popular.length ? (
              popular.map((bookshelf) => (
                <Box key={bookshelf.id} minW="20rem" maxW={['100%', '20rem']}>
                  <BookshelfCard
                    bookshelf={bookshelf}
                    disabled={false}
                    onDeleteFork={() => {
                      console.log('a');
                    }}
                    onFork={() => {
                      console.log('b');
                    }}
                  />
                </Box>
              ))
            ) : (
              <Text>No bookshelves found</Text>
            )}
          </DashboardSection>
        )}

        <Text as="h2">Recommended Books</Text>
        {fetchingBooks ? (
          <Text>Fetching Recommended Books...</Text>
        ) : (
          <DashboardSection>
            {books.length ? (
              books.map((book) => (
                <Box key={book.id} minW="20rem" maxW={['100%', '20rem']}>
                  <BookCard
                    id={book.id}
                    author={book.author}
                    genres={book.genres}
                    image_url_l={book.image_url_l}
                    title={book.title}
                  />
                </Box>
              ))
            ) : (
              <Text>No bookshelves found</Text>
            )}
          </DashboardSection>
        )}

        <Text as="h2">Recommended Bookshelves</Text>
        {fetchingRecommended ? (
          <Text>Fetching Recommended bookshelves...</Text>
        ) : (
          <DashboardSection>
            {recommended.length ? (
              recommended.map((bookshelf) => (
                <Box key={bookshelf.id} minW="20rem" maxW={['100%', '20rem']}>
                  <BookshelfCard
                    bookshelf={bookshelf}
                    disabled={false}
                    onDeleteFork={() => {
                      console.log('a');
                    }}
                    onFork={() => {
                      console.log('b');
                    }}
                  />
                </Box>
              ))
            ) : (
              <Text>No bookshelves found</Text>
            )}
          </DashboardSection>
        )}
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
