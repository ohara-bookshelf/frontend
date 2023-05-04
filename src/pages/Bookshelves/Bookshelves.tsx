import {
  Container,
  Grid,
  GridItem,
  Heading,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import BookshelfCard from 'src/components/Card/BookshelfCard';
import Loading from 'src/components/Preloader/Loading';
import { IBookshelf } from 'src/shared/interfaces';
import * as API from 'src/api';

const Bookshelves = () => {
  const [bookshelves, setBookshelves] = useState<IBookshelf[]>([]);
  const {
    isOpen: isLoading,
    onOpen: onLoading,
    onClose: onLoaded,
  } = useDisclosure();

  const fetchBookshelves = async () => {
    onLoading();
    try {
      const { data } = await API.bookshelfAPI.findMany();
      setBookshelves(data);
    } catch (error) {
      setBookshelves([]);
    } finally {
      onLoaded();
    }
  };

  useEffect(() => {
    fetchBookshelves();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Container maxW="100%" pl={10}>
      <Stack spacing={10}>
        <Heading textAlign="center">What's New</Heading>
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {bookshelves.map((bookshelf) => {
            return (
              <GridItem key={bookshelf.id} w="100%">
                <BookshelfCard
                  bookshelf={bookshelf}
                  disabled={isLoading}
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  onDeleteFork={() => {}}
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
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
