import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Spinner,
  Stack,
  Tag,
  Text,
  VStack,
  useBreakpointValue,
  useDisclosure,
  useId,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import * as API from 'src/api';
import { Expression, IBook, IBookReview } from 'src/shared/interfaces';
import Loading from 'src/components/Preloader/Loading';
import BookCard from 'src/components/Card/BookCard';
import { useAuthStore } from 'src/flux/store';
import AddBookModal from './components/Modal/AddBookModal';
import BookReviewCard from './components/Card/BookReviewCard';
import BookReviewModal from './components/Modal/BookReviewModal';
import Rating from './components/Rating/Rating';
import axios, { AxiosError } from 'axios';
import { EMOTION_COLOR } from 'src/shared/constants';

export default function Book() {
  const { bookId } = useParams();
  const uuid = useId();

  const { isAuthenticated } = useAuthStore();

  const [book, setBook] = useState<IBook>();
  const [recommendations, setRecommendations] = useState<IBook[]>([]);
  const [loadingBook, setLoadingBook] = useState(false);
  const [reviews, setReviews] = useState<IBookReview[]>([]);
  const [review, setReview] = useState<IBookReview>();
  const [rating, setRating] = useState(0);
  const [sentiment, setSentiment] = useState<Expression>(Expression.neutral);

  const [reviewError, setReviewError] = useState<string>();
  const [fetchingReview, setFetchingReview] = useState(false);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isReveiw,
    onClose: onCloseReview,
    onOpen: onOpenReview,
  } = useDisclosure();
  const columnCount = useBreakpointValue({ base: 2, md: 3, lg: 4 });

  const openReveiwHandler = (review: IBookReview) => {
    setReview(review);
    onOpenReview();
  };

  const closeReveiwHandler = () => {
    setReview(undefined);
    onCloseReview();
  };

  const setDefaultReview = () => {
    setReviews([]);
    setRating(0);
  };

  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) return;
      setLoadingBook(true);
      try {
        const { data } = await API.bookAPI.findBookById(bookId);
        const { data: recommendations } = await API.bookAPI.getRecommendation(
          data.book.isbn,
          5
        );
        const { data: sentiment } = await API.bookAPI.getBooksBySentiment(
          new URLSearchParams({
            sentiment: data.sentiment,
            take: '5',
          }).toString()
        );

        setBook(data.book);
        setSentiment(data.sentiment);
        setRecommendations([...recommendations, ...sentiment]);
      } catch (error) {
        setBook({} as IBook);
        setRecommendations([]);
        setSentiment(Expression.neutral);
      } finally {
        setLoadingBook(false);
      }
    };

    fetchBook();
  }, [bookId]);

  useEffect(() => {
    const fetchReview = async () => {
      setFetchingReview(true);
      setReviewError(undefined);
      setReviews([]);

      try {
        if (!bookId) {
          setDefaultReview();
          setFetchingReview(false);
          return;
        }
        setFetchingReview(true);

        const { data } = await API.bookAPI.getBookReviews(bookId);

        if (!data) {
          setDefaultReview();
        }

        setReviews(data.reviews);
        setRating(data.rating);
      } catch (err) {
        setReviews([]);
        setRating(0);
        const error = err as Error | AxiosError;

        if (axios.isAxiosError(error)) {
          setReviewError(error.response?.data?.message || 'An error occurred');
        } else {
          setReviewError(error.message);
        }
      } finally {
        setFetchingReview(false);
      }
    };

    fetchReview();
  }, [bookId]);

  if (loadingBook) return <Loading />;

  return (
    <Container maxW="100%" px={10} py={8}>
      <VStack spacing={4} w="100%">
        <Heading textAlign={'center'} mb="4">
          {book?.title}
        </Heading>
        <Text as="p" textAlign={'center'}>
          {book?.author}, {book?.year_of_publication}
        </Text>
        {sentiment && (
          <Flex
            paddingX={'2'}
            paddingY={'1'}
            background={EMOTION_COLOR[sentiment]}
            borderRadius={'md'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Text as="p" textAlign={'center'}>
              {sentiment}
            </Text>
          </Flex>
        )}

        {!reviewError && rating && (
          <Flex w="100%" justifyContent="center" alignItems={'center'}>
            <Rating code="page" length={rating} />
          </Flex>
        )}

        <Stack direction={['column', 'column', 'column', 'row']} spacing={8}>
          <Box w={['100%', '100%', '100%', '50%']}>
            <VStack
              spacing={6}
              position="sticky"
              top="5"
              zIndex="sticky"
              overflow={'auto'}
            >
              <Button
                display={isAuthenticated ? 'block' : 'none'}
                onClick={onOpen}
                colorScheme="facebook"
              >
                add to bookshelf
              </Button>
              <Image src={book?.image_url_l} alt={book?.title} />
              <Flex
                gap="4"
                wrap="wrap"
                justifyContent="center"
                alignItems="center"
              >
                {book?.genres?.map((tag, i) => (
                  <Tag key={uuid + book.id + i} colorScheme="teal">
                    {tag}
                  </Tag>
                ))}
              </Flex>
              <Text as="p" textAlign={'center'}>
                {book?.description}
              </Text>
            </VStack>
          </Box>

          <VStack spacing={6} w={['100%', '100%', '100%', '50%']}>
            <Text as="h3" textAlign={'center'}>
              Book Recommendations
            </Text>
            <Grid
              w="100%"
              templateColumns={[
                'repeat(1, 1fr)',
                'repeat(2, 1fr)',
                'repeat(3, 1fr)',
                'repeat(2, 1fr)',
              ]}
              gap={6}
            >
              {recommendations?.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </Grid>
          </VStack>
        </Stack>

        <Text as="h3" textAlign={'center'}>
          Book Reviews
        </Text>

        {fetchingReview ? (
          <Spinner />
        ) : reviewError ? (
          <Text color="red.500">{reviewError}</Text>
        ) : reviews.length ? (
          <Grid templateColumns={`repeat(${columnCount}, 1fr)`} gap={4}>
            {reviews.map((review, idx) => (
              <BookReviewCard
                key={idx}
                review={review}
                onReview={openReveiwHandler}
              />
            ))}
          </Grid>
        ) : (
          <Text as="p" textAlign={'center'}>
            No reviews yet
          </Text>
        )}
      </VStack>

      <AddBookModal
        isOpen={isOpen}
        onClose={onClose}
        onHandleSubmit={() => {
          onClose();
        }}
      />

      {review && (
        <BookReviewModal
          review={review}
          isOpen={isReveiw}
          onClose={closeReveiwHandler}
        />
      )}
    </Container>
  );
}
