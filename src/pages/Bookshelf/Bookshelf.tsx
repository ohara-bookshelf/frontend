import {
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IBookshelf } from 'src/shared/interfaces';
import * as API from 'src/api';
import Loading from 'src/components/Preloader/Loading';
import Error from 'src/components/Error/Error';
import BookCard from 'src/components/Card/BookCard';
import { MdBackupTable, MdGridView } from 'react-icons/md';
import ForkButton from 'src/components/Button/ForkButton';
import { useUserStore } from 'src/flux/store';
import { PAGE_PATH } from 'src/shared/constants';
import { randomIndex } from 'src/shared/utils/random';
import BookshelfCard from 'src/components/Card/BookshelfCard';
import ProfileAvatar from 'src/components/Avatar/ProfileAvatar';

const Bookshelf = () => {
  const { bookshelfId } = useParams();
  const navigate = useNavigate();

  const { user } = useUserStore();

  const [bookshelf, setBookshelf] = useState<IBookshelf>();
  const [recommendtaions, setRecommendations] = useState<IBookshelf[]>([]);

  const {
    isOpen: loading,
    onOpen: onLoading,
    onClose: onLoaded,
  } = useDisclosure();
  const { isOpen: isTable, onToggle } = useDisclosure();

  const {
    isOpen: loadRecom,
    onOpen: onLoadingRecom,
    onClose: onLoadedRecom,
  } = useDisclosure();

  useEffect(() => {
    if (!bookshelfId) return;

    const isOwner = bookshelf?.owner.id === user?.id;

    if (isOwner) {
      navigate(PAGE_PATH.USER_BOOKSHELF(bookshelfId));
    }
  }, [bookshelf?.owner.id, bookshelfId, navigate, user?.id]);

  useEffect(() => {
    const fetchBookshelf = async () => {
      if (!bookshelfId) return;
      onLoading();
      try {
        const { data } = await API.bookshelfAPI.findOne(bookshelfId);

        if (data.books.length > 0) {
          const index = Math.floor(Math.random() * data.books.length);
          const { isbn } = data.books[index].book;

          if (isbn) {
            const { data: recom } = await API.bookshelfAPI.getRecommendation(
              isbn
            );

            setRecommendations(recom);
          }
        }
        setBookshelf(data);
      } catch (error) {
        setBookshelf({} as IBookshelf);
        setRecommendations([]);
      } finally {
        onLoaded();
      }
    };

    fetchBookshelf();
  }, [bookshelfId, onLoaded, onLoading]);

  useEffect(() => {
    async function fetchRecommendations() {
      const isbnList = bookshelf?.books.map(({ book }) => book.isbn);
      const isbn = isbnList ? isbnList[randomIndex(isbnList.length)] : null;

      onLoadingRecom();
      try {
        const { data } = await API.bookshelfAPI.getRecommendation(isbn);
        setRecommendations(data);
      } catch (error) {
        setRecommendations([]);
      } finally {
        onLoadedRecom();
      }
    }

    fetchRecommendations();
  }, [onLoadedRecom, onLoadingRecom, user, bookshelf]);

  if (loading) return <Loading />;
  if (!bookshelf) return <Error />;

  return (
    <Container maxW="100%" px={10} py="8">
      <VStack spacing={4} mb={4}>
        <Heading textAlign={'center'}>
          {bookshelf.name.replace(/\b\w+/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          })}
        </Heading>
        <HStack spacing={4}>
          <Text as={'p'} fontSize={'sm'} textColor={'gray.500'}>
            {bookshelf._count.books} books
          </Text>
          <Text as={'p'} fontSize={'sm'} textColor={'gray.500'}>
            {bookshelf._count.userForks} forks
          </Text>
        </HStack>

        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          flexDir={'column'}
          gap="2"
          padding="4"
          borderRadius={'md'}
          transition={'all 0.2s ease-in-out'}
          bgColor={'gray.700'}
          _hover={{
            cursor: 'pointer',
            backgroundColor: 'gray.800',
          }}
          onClick={() => navigate(PAGE_PATH.USER(bookshelf.owner.id))}
        >
          <ProfileAvatar
            src={bookshelf.owner.profileImgUrl}
            size={'xl'}
            name={`${bookshelf.owner.firstName} ${bookshelf.owner.lastName}`}
            expression={bookshelf.owner.expression}
          />
          <Text
            as={'p'}
            textAlign={'center'}
            fontSize={'sm'}
            textColor={'gray.500'}
          >
            {`${bookshelf.owner.firstName} ${bookshelf.owner.lastName}`}
          </Text>
        </Flex>

        <Text as={'h4'} textAlign={'center'} fontSize={'lg'}>
          {bookshelf.description}
        </Text>

        <Button
          leftIcon={isTable ? <MdGridView /> : <MdBackupTable />}
          colorScheme="facebook"
          variant="solid"
          onClick={onToggle}
        >
          {isTable ? 'show books as grid' : 'show books as table'}
        </Button>

        <ForkButton bookshelf={bookshelf} />

        {isTable ? (
          <TableContainer w="100%" wordBreak={'break-all'}>
            <Table colorScheme="facebook">
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
                    key={book.id}
                    _hover={{
                      cursor: 'pointer',
                      backgroundColor: 'gray.900',
                      transition: 'all 0.2s ease-in-out',
                    }}
                    onClick={() => navigate(`/books/${book.id}`)}
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
            w="100%"
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
              <GridItem key={book.id} position="relative" role="group">
                <BookCard book={book} />
              </GridItem>
            ))}
          </Grid>
        )}

        <Text>Recommended Bookshelf</Text>
        {loadRecom ? (
          <Text>Loading...</Text>
        ) : (
          <Grid
            w="100%"
            templateColumns={[
              'repeat(1, 1fr)',
              'repeat(1, 1fr)',
              'repeat(2, 1fr)',
              'repeat(3, 1fr)',
              'repeat(4, 1fr)',
            ]}
            gap={6}
          >
            {recommendtaions.map((bookshelf) => (
              <GridItem key={bookshelf.id} w="100%">
                <BookshelfCard bookshelf={bookshelf} />
              </GridItem>
            ))}
          </Grid>
        )}
      </VStack>
    </Container>
  );
};

export default Bookshelf;
