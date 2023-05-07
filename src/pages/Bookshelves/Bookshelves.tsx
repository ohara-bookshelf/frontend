import { Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import BookshelfCard from 'src/components/Card/BookshelfCard';
import Loading from 'src/components/Preloader/Loading';
import { IBookshelf } from 'src/shared/interfaces';
import * as API from 'src/api';
import { usePaginationStore } from 'src/flux/store';

const Bookshelves = () => {
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

  const [bookshelves, setBookshelves] = useState<IBookshelf[]>([]);

  const fetchBookshelves = useCallback(
    async (take: string, page: string) => {
      onLoading();
      try {
        const queryString = new URLSearchParams({
          take: take,
          page: page,
          owner: 'true',
          userForks: 'true',
          _count: 'true',
        }).toString();

        const { data } = await API.bookshelfAPI.findMany(queryString);

        setBookshelves(data.data);
        setTotalItems(data.meta.totalItems);
        setTotalPages(data.meta.totalPages);
        setCurrentPage(data.meta.currentPage);
        setTake(data.meta.take);
      } catch (error) {
        setBookshelves([]);
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
    fetchBookshelves(take.toString(), currentPage.toString());
  }, [take, currentPage, fetchBookshelves]);

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
      {bookshelves.map((bookshelf) => {
        return (
          <GridItem key={bookshelf.id} w="100%">
            <BookshelfCard bookshelf={bookshelf} />
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default Bookshelves;
