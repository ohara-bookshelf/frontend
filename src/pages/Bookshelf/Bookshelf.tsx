import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Link,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IBookshelf } from 'src/shared/interfaces';
import * as API from 'src/api';
import Loading from 'src/components/Preloader/Loading';
import Error from 'src/components/Error/Error';
import BookCard from 'src/components/Card/BookCard';
import { MdBackupTable, MdGridView } from 'react-icons/md';

const Bookshelf = () => {
  const { bookshelfId } = useParams();
  const navigate = useNavigate();
  const [bookshelf, setBookshelf] = useState<IBookshelf>();
  const {
    isOpen: loading,
    onOpen: onLoading,
    onClose: onLoaded,
  } = useDisclosure();
  const { isOpen: isTable, onToggle } = useDisclosure();

  useEffect(() => {
    const fetchBookshelf = async () => {
      if (!bookshelfId) return;
      onLoading();
      try {
        const { data } = await API.bookshelfAPI.findOne(bookshelfId);
        setBookshelf(data);
      } catch (error) {
        setBookshelf({} as IBookshelf);
      } finally {
        onLoaded();
      }
    };

    fetchBookshelf();
  }, [bookshelfId]);

  if (loading) return <Loading />;
  if (!bookshelf) return <Error />;

  return (
    <Container maxW='100%' px={10} py='8'>
      <VStack spacing={4} mb={4}>
        <Heading textAlign={'center'}>
          {bookshelf.name.replace(/\b\w+/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          })}
        </Heading>
        <Text
          as={'p'}
          textAlign={'center'}
          fontSize={'sm'}
          textColor={'gray.500'}
        >
          by {`${bookshelf.owner.firstName} ${bookshelf.owner.lastName}`}
        </Text>
        <Text w='90vw' as={'h4'} textAlign={'center'} fontSize={'lg'}>
          {bookshelf.description}
        </Text>

        <Button
          leftIcon={isTable ? <MdBackupTable /> : <MdGridView />}
          colorScheme='facebook'
          variant='solid'
          onClick={onToggle}
        >
          {isTable ? 'show grid' : 'show table'}
        </Button>

        {isTable ? (
          <TableContainer w='100%' wordBreak={'break-all'}>
            <Table colorScheme='facebook'>
              <TableCaption>{`${bookshelf.owner.firstName}'s collenction`}</TableCaption>
              <Thead>
                <Tr>
                  <Th>ISBN</Th>
                  <Th>Title</Th>
                  <Th>Author</Th>
                  <Th>Publisher</Th>
                  <Th isNumeric>Publish Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {bookshelf.books.map(({ book }) => (
                  <Tr
                    _hover={{
                      cursor: 'pointer',
                      backgroundColor: 'gray.900',
                      transition: 'all 0.2s ease-in-out',
                    }}
                    onClick={() => navigate(`/book/${book.id}`)}
                  >
                    <Td w={'18'}> {book.isbn}</Td>
                    <Td maxW={80}>
                      <Text wordBreak={'break-word'}>
                        {`${book.title.slice(0, 50)} ${
                          book.title.length > 50 ? '...' : ''
                        }`}
                      </Text>
                    </Td>
                    <Td>{book.author}</Td>
                    <Td>{book.publisher}</Td>
                    <Td w={'12'} isNumeric>
                      {book.year_of_publication}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Grid
            w='100%'
            templateColumns={[
              'repeat(1, 1fr)',
              'repeat(1, 1fr)',
              'repeat(2, 1fr)',
              'repeat(3, 1fr)',
              'repeat(4, 1fr)',
            ]}
            gap={6}
          >
            {bookshelf.books.map(({ book }) => (
              <GridItem key={book.id} position='relative' role='group'>
                <BookCard
                  id={book.id}
                  author={book.author}
                  title={book.title}
                  image_url_l={book.image_url_l}
                  genres={book.genres}
                />
              </GridItem>
            ))}
          </Grid>
        )}

        <Stack spacing={4} direction={'row'}></Stack>
      </VStack>
    </Container>
  );
};

export default Bookshelf;
