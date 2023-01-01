import { Container, Grid, GridItem, Heading, Stack } from '@chakra-ui/react';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import * as api from '../../api';
import BookshelfCard from '../../components/Card/BookshelfCard';
import Loading from '../../components/PreLoader/Loading';

const Bookshelves = () => {
  const queryClient = useQueryClient();

  const { data: bookshelves, isLoading } = useQuery(
    'bookshelves',
    api.getAllBookshelf
  );

  const { data: user } = useQuery('user');

  const { mutate: deleteForkedBookshelf, isLoading: isDeleting } = useMutation(
    api.deleteForkedBookshelf,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('bookshelves');
        queryClient.invalidateQueries('user');
      },
    }
  );

  const { mutate: forkBookshelf, isLoading: isForking } = useMutation(
    api.forkBookshelf,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('bookshelves');
        queryClient.invalidateQueries('user');
      },
    }
  );

  if (isLoading) return <Loading />;

  return (
    <Container maxW="100%" pl={10}>
      <Stack spacing={10}>
        <Heading textAlign="center">What's New</Heading>
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {bookshelves.map((bookshelf) => {
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
      </Stack>
    </Container>
  );
};

export default Bookshelves;
