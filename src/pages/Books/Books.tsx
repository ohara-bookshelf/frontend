import { Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import Loading from 'src/components/Preloader/Loading';
import { IBook } from 'src/shared/interfaces';
import * as API from 'src/api';
import { usePaginationStore } from 'src/flux/store';
import BookCard from 'src/components/Card/BookCard';

export default function Books() {
  const {
    isOpen: isLoading,
    onOpen: onLoading,
    onClose: onLoaded,
  } = useDisclosure();

  const {
    take,
    currentPage,
    setCurrentPage,
    setTotalItems,
    setTotalPages,
    setTake,
  } = usePaginationStore();

  const [books, setBooks] = useState<IBook[]>([]);

  const fetchBooks = useCallback(
    async (take: string, page: string) => {
      onLoading();
      try {
        const queryString = new URLSearchParams({
          take: take,
          page: page,
        }).toString();

        const { data } = await API.bookAPI.findBooks(queryString);

        setBooks(data.data);
        setTotalItems(data.meta.totalItems);
        setTotalPages(data.meta.totalPages);
        setCurrentPage(data.meta.currentPage);
        setTake(data.meta.take);
      } catch (error) {
        setBooks([]);
        setCurrentPage(1);
        setTotalItems(0);
        setTotalPages(0);
        setTake(25);
      } finally {
        onLoaded();
      }
    },
    [onLoaded, onLoading, setCurrentPage, setTake, setTotalItems, setTotalPages]
  );

  useEffect(() => {
    fetchBooks(take.toString(), currentPage.toString());
  }, [currentPage, fetchBooks, take]);

  if (isLoading) return <Loading />;

  return (
    <Grid
      templateColumns={[
        'repeat(1, 1fr)',
        'repeat(1, 1fr)',
        'repeat(2, 1fr)',
        'repeat(3, 1fr)',
        'repeat(4, 1fr)',
      ]}
      gap={6}
    >
      {books.map((book) => {
        return (
          <GridItem key={book.id} w="100%">
            <BookCard book={book} />
          </GridItem>
        );
      })}
    </Grid>
  );
}
