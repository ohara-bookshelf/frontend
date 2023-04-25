import { Container, Grid, GridItem, Heading, Stack } from '@chakra-ui/react';

import BookshelfCard from 'src/components/Card/BookshelfCard';
import useDisclosure from 'src/shared/hooks/useDisclosure';
import Loading from 'src/components/PreLoader/Loading';

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
    id: 2,
    name: 'Bookshelf 2',
    owner: {
      id: 2,
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
    id: 3,
    name: 'Bookshelf 3',
    owner: {
      id: 3,
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
    id: 4,
    name: 'Bookshelf 4',
    owner: {
      id: 4,
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

const user = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  forkedshelves: [
    {
      id: 1,
      bookshelfId: 1,
    },
    {
      id: 2,
      bookshelfId: 2,
    },
    {
      id: 3,
      bookshelfId: 3,
    },
    {
      id: 4,
      bookshelfId: 4,
    },
  ],
};

const Bookshelves = () => {
  const [isLoading, onLoading, onLoaded] = useDisclosure();

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
                  disabled={isLoading}
                  onDeleteFork={() => {}}
                  onFork={() => {}}
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
