import { useEffect, useState } from 'react';
import { Box, Container, Link, Stack, Text } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import BookshelfCard from 'src/components/Card/BookshelfCard';
import DashboardSection from './components/DashboardSection/DashboardSection';
import BookCard from 'src/components/Card/BookCard';
import { IBook, IBookshelf } from 'src/shared/interfaces';
import * as API from 'src/api';
import { useIsbn } from 'src/shared/hooks';

export default function Dashboard() {
  const [popular, setPopular] = useState<IBookshelf[]>([]);
  const [recommended, setRecommended] = useState<IBookshelf[]>([]);
  const [books, setBooks] = useState<IBook[]>([]);
  const [fetchingPopular, setFetchingPopular] = useState(false);
  const [fetchingRecommended, setFetchingRecommended] = useState(false);
  const [fetchingBooks, setFetchingBooks] = useState(false);

  const [randIsbn, setRandIsbn] = useIsbn();

  useEffect(() => {
    setRandIsbn();
  }, [setRandIsbn]);

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
        const { data } = await API.bookAPI.getRecommendation(randIsbn);
        setBooks(data);
      } catch (error) {
        console.error(error);
        setBooks([]);
      } finally {
        setFetchingBooks(false);
      }
    };

    fetchRecommendedBooks();
  }, [randIsbn]);

  useEffect(() => {
    const fetchRecommendedBookshelves = async () => {
      setFetchingRecommended(true);
      try {
        const { data } = await API.bookshelfAPI.getRecommendation(randIsbn);
        setRecommended(data);
      } catch (error) {
        console.error(error);
        setRecommended([]);
      } finally {
        setFetchingRecommended(false);
      }
    };

    fetchRecommendedBookshelves();
  }, [randIsbn]);

  return (
    <Container maxW="100%" py="8">
      <Stack spacing={10} textAlign={'center'}>
        <Text as="h2">Popular Bookshelves</Text>
        <Link as={ReachLink} to="/bookshelves">
          See all
        </Link>
        {fetchingPopular ? (
          <Text>Fetching Popular...</Text>
        ) : (
          <DashboardSection>
            {popular.length ? (
              popular.map((bookshelf) => (
                <Box key={bookshelf.id} minW="20rem" maxW={['100%', '20rem']}>
                  <BookshelfCard bookshelf={bookshelf} />
                </Box>
              ))
            ) : (
              <Text>No bookshelves found</Text>
            )}
          </DashboardSection>
        )}

        <Text as="h2">Recommended Books</Text>
        <Link as={ReachLink} to="/books">
          See All
        </Link>
        {fetchingBooks ? (
          <Text>Fetching Recommended Books...</Text>
        ) : (
          <DashboardSection>
            {books.length ? (
              books.map((book) => (
                <Box key={book.id} minW="20rem" maxW={['100%', '20rem']}>
                  <BookCard book={book} />
                </Box>
              ))
            ) : (
              <Text>No bookshelves found</Text>
            )}
          </DashboardSection>
        )}

        <Text as="h2">Recommended Bookshelves</Text>
        <Link as={ReachLink} to="/bookshelves">
          See All
        </Link>

        {fetchingRecommended ? (
          <Text>Fetching Recommended bookshelves...</Text>
        ) : (
          <DashboardSection>
            {recommended.length ? (
              recommended.map((bookshelf) => (
                <Box key={bookshelf.id} minW="20rem" maxW={['100%', '20rem']}>
                  <BookshelfCard bookshelf={bookshelf} />
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
