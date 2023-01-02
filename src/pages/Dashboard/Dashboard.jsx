import React, { useId, useState } from 'react';
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
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link as ReachLink } from 'react-router-dom';
import * as api from '../../api';
import randomIndex from '../../shared/utils/randomIndex';
import BookshelfCard from '../../components/Card/BookshelfCard';

function Dashboard() {
  const queryClient = useQueryClient();
  const uuid = useId();

  const [bookTitles, setBookTitles] = useState([
    'Maniac Magee',
    'The Outsiders',
    'Lassie Come-Home',
    'The Sign of Four',
  ]);

  const {
    data: bookshelves,
    error,
    status: bookshelfStatus,
  } = useQuery('bookshelves', api.getPopularBookshelf);

  const { data: user } = useQuery('user', api.getUserDetail, {
    onSuccess: ({ bookshelves, forkedshelves }) => {
      let books = [];

      forkedshelves.forEach(({ bookshelf }) => {
        bookshelf.books.forEach(({ book }) => {
          books.push(book.title);
        });
      });

      Object.keys(bookshelves).forEach((key) => {
        bookshelves[key].forEach(({ books }) => {
          books.forEach(({ book }) => {
            books.push(book.title);
          });
        });
      });

      setBookTitles(books);
    },
  });

  const {
    data: books,
    error: recommendBookError,
    isLoading: isRecomBookFetching,
    refetch: refetchBooks,
  } = useQuery(
    'books',
    () =>
      api.getRecommededBooks(bookTitles[randomIndex(bookTitles.length)], 20),
    {
      initialData: [],
    }
  );

  const {
    data: recommendBookshelves,
    error: recommendBookshelfError,
    isLoading: isRecomBookshelfFetching,
    refetch: refetchBookshelves,
  } = useQuery(
    'bookshelves/recommend',
    () =>
      api.getRecommededBookshelves(
        bookTitles[randomIndex(bookTitles.length)],
        20
      ),
    {
      initialData: [],
    }
  );

  const { mutate: deleteForkedBookshelf, isLoading: isDeleting } = useMutation(
    api.deleteForkedBookshelf,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      },
    }
  );

  const { mutate: forkBookshelf, isLoading: isForking } = useMutation(
    api.forkBookshelf,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      },
    }
  );

  return (
    <Container maxW="100%" pl={10} py={6}>
      <Stack spacing={10}>
        <Text as="h2">Popular Bookshelves</Text>
        <Box width="100%" my="6">
          {bookshelfStatus === 'loading' && <div>Loading...</div>}
          {bookshelfStatus === 'error' && <div>Error: {error.message}</div>}
          {bookshelfStatus === 'success' && (
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              {bookshelves.slice(0, 12).map((bookshelf) => {
                const owner = bookshelf.owner.id === user?.id;
                const forked = user?.forkedshelves.some(
                  (item) => item.bookshelfId === bookshelf.id
                );
                const forkId = user?.forkedshelves.find(
                  (item) => item.bookshelfId === bookshelf.id
                )?.id;

                return (
                  <GridItem key={bookshelf.id} w="100%">
                    <BookshelfCard
                      bookshelf={bookshelf}
                      forked={forked}
                      owner={owner}
                      user={user}
                      isForking={isForking}
                      isDeleting={isDeleting}
                      onDeleteFork={() => deleteForkedBookshelf(forkId)}
                      onFork={() => forkBookshelf(bookshelf.id)}
                    />
                  </GridItem>
                );
              })}
            </Grid>
          )}
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
          {recommendBookError ? (
            <Text textAlign="center">
              error acquired,{' '}
              <Text
                as="span"
                color="teal"
                _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={refetchBooks}
              >
                try to fetch data again
              </Text>
            </Text>
          ) : isRecomBookFetching ? (
            <Text textAlign="center">Loading...</Text>
          ) : (
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
          )}
        </Box>

        <Box>
          <Text as="h2" textAlign="center">
            Recomended Bookshelves
          </Text>
          {recommendBookshelfError ? (
            <Text textAlign="center">
              error acquired,{' '}
              <Text
                as="span"
                color="teal"
                _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={refetchBookshelves}
              >
                try to fetch data again
              </Text>
            </Text>
          ) : isRecomBookshelfFetching ? (
            <Text textAlign="center">Loading...</Text>
          ) : (
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              {recommendBookshelves?.map((bookshelf) => {
                const owner = bookshelf.owner.id === user?.id;
                const forked = user?.forkedshelves.some(
                  (item) => item.bookshelfId === bookshelf.id
                );
                const forkId = user?.forkedshelves.find(
                  (item) => item.bookshelfId === bookshelf.id
                )?.id;

                return (
                  <GridItem key={bookshelf.id} w="100%">
                    <BookshelfCard
                      bookshelf={bookshelf}
                      forked={forked}
                      owner={owner}
                      user={user}
                      isForking={isForking}
                      isDeleting={isDeleting}
                      onDeleteFork={() => deleteForkedBookshelf(forkId)}
                      onFork={() => forkBookshelf(bookshelf.id)}
                    />
                  </GridItem>
                );
              })}
            </Grid>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

export default Dashboard;
