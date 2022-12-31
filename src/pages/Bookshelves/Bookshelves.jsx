import {
  Button,
  Card,
  CardBody,
  Container,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import * as api from '../../api';
import dateParser from '../../shared/utils/dateParser';

const Bookshelves = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: bookshelves,
    isLoading,
    error,
  } = useQuery('bookshelves', api.getAllBookshelf);

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

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container maxW="100%" pl={10}>
      <Stack spacing={10}>
        <Heading textAlign="center" mt={6}>
          What's New
        </Heading>
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {bookshelves.map((bookshelf) => {
            const owner = bookshelf.owner.id === user.id;
            const forked = user.forkedshelves.some(
              (item) => item.bookshelfId === bookshelf.id
            );
            const forkId = user.forkedshelves.find(
              (item) => item.bookshelfId === bookshelf.id
            )?.id;

            return (
              <GridItem key={bookshelf.id} w="100%">
                <Card h="100%">
                  <CardBody>
                    <Text textAlign="center" as="h5" mb={6}>
                      {bookshelf.name}
                    </Text>

                    <Text>
                      Owner: {bookshelf.owner.firstName}{' '}
                      {bookshelf.owner.lastName}
                    </Text>

                    <Text as="h6">Books: {bookshelf._count.books}</Text>

                    <Text as="h6">
                      Total Fork: {bookshelf._count.userForks}
                    </Text>

                    <Text as="h6">{dateParser(bookshelf.createdAt)}</Text>

                    {owner ? (
                      <Button
                        mt={6}
                        variant="solid"
                        colorScheme="blue"
                        onClick={() => navigate(`/profile/${bookshelf.id}`)}
                      >
                        Detail
                      </Button>
                    ) : forked ? (
                      <Button
                        mt={6}
                        disabled={isDeleting}
                        variant="outline"
                        colorScheme="red"
                        onClick={() => {
                          deleteForkedBookshelf(forkId);
                        }}
                      >
                        Unfork
                      </Button>
                    ) : (
                      <Button
                        mt={6}
                        disabled={isForking}
                        variant="solid"
                        colorScheme="teal"
                        onClick={() => forkBookshelf(bookshelf.id)}
                      >
                        Fork
                      </Button>
                    )}
                  </CardBody>
                </Card>
              </GridItem>
            );
          })}
        </Grid>
      </Stack>
    </Container>
  );
};

export default Bookshelves;
