import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Tag,
  Text,
  VStack,
  useId,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import * as API from 'src/api';
import { IBook } from 'src/shared/interfaces';
import Loading from 'src/components/Preloader/Loading';
import BookCard from 'src/components/Card/BookCard';

export default function Book() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const uuid = useId();

  const [book, setBook] = useState<IBook>();
  const [recommendations, setRecommendations] = useState<IBook[]>([]);
  const [loadingBook, setLoadingBook] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) return;
      setLoadingBook(true);
      try {
        const { data } = await API.bookAPI.findBookById(bookId);
        const { data: recommendations } = await API.bookAPI.getRecommendation(
          data.title
        );

        setBook(data);
        setRecommendations(recommendations);
      } catch (error) {
        setBook({} as IBook);
        setRecommendations([]);
      } finally {
        setLoadingBook(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loadingBook) return <Loading />;

  return (
    <Container maxW='100%' px={10} py={8}>
      <Heading textAlign={'center'} mb='4'>
        {book?.title}
      </Heading>
      <Text as='p' mb={10} textAlign={'center'}>
        {book?.author}, {book?.year_of_publication}
      </Text>
      <Stack direction={['column', 'column', 'column', 'row']} spacing={8}>
        <Box w={['100%', '100%', '100%', '50%']}>
          <VStack
            spacing={6}
            position='sticky'
            top='5'
            zIndex='sticky'
            overflow={'auto'}
          >
            <Button>add to bookshelf</Button>
            <Image src={book?.image_url_l} alt={book?.title} />
            <Flex
              gap='4'
              wrap='wrap'
              justifyContent='center'
              alignItems='center'
            >
              {book?.genres?.map((tag, i) => (
                <Tag key={uuid + book.id + i}>{tag}</Tag>
              ))}
            </Flex>
            <Text as='p' textAlign={'center'}>
              {book?.description}
            </Text>
          </VStack>
        </Box>

        <VStack spacing={6} w={['100%', '100%', '100%', '50%']}>
          <Text as='h3' textAlign={'center'}>
            Book Recommendations
          </Text>
          <Grid
            w='100%'
            templateColumns={[
              'repeat(1, 1fr)',
              'repeat(2, 1fr)',
              'repeat(3, 1fr)',
              'repeat(2, 1fr)',
            ]}
            gap={6}
          >
            {recommendations?.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                author={book.author}
                title={book.title}
                genres={book.genres}
                image_url_l={book.image_url_l}
              />
            ))}
          </Grid>
        </VStack>
      </Stack>
    </Container>
  );
}
