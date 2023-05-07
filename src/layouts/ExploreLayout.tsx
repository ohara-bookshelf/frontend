import {
  Container,
  Flex,
  Heading,
  Select,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Pagination from 'src/components/Pagination/Pagination';
import { Outlet } from 'react-router-dom';
import { usePaginationStore } from 'src/flux/store';

export default function ExploreLayout() {
  const { take, currentPage, totalPages, setCurrentPage, setTake } =
    usePaginationStore();

  return (
    <Container maxW="100%" px={10} py={8}>
      <Stack spacing={10} alignItems="center">
        <Heading textAlign="center">What's New</Heading>
        <Flex
          w="100%"
          alignItems="center"
          justifyContent={'space-between'}
          gap={6}
          alignSelf={'start'}
        >
          <VStack gap={2}>
            <Text>Items per page</Text>
            <Select value={take} onChange={(e) => setTake(+e.target.value)}>
              <option value={'25'}>25</option>
              <option value={'50'}>50</option>
              <option value={'75'}>75</option>
              <option value={'100'}>100</option>
            </Select>
          </VStack>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />

          <Text>
            page {currentPage} of {totalPages}
          </Text>
        </Flex>
        <Outlet />
        {/* <Grid
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
        </Grid> */}
      </Stack>
    </Container>
  );
}
