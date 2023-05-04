import {
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Camera from '../components/Camera/Camera';
import { FaCamera } from 'react-icons/fa';
import BookCard from 'src/components/Card/BookCard';
import * as API from 'src/api';
import { IBook } from 'src/shared/interfaces';
interface EmotionLabels {
  [key: string]: string;
}

const emotion_labels: EmotionLabels = {
  angry: '😠',
  disgust: '🤢',
  fear: '😨',
  happy: '😃',
  neutral: '😐',
  sad: '😢',
  surprised: '😮',
};

export default function UserAssistant() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [books, setBooks] = useState<IBook[]>([]);
  const [emotion, setEmotion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const captureHandler = async () => {
    setIsLoading(true);
    try {
      if (!webcamRef.current) return;

      const imageSrc = webcamRef.current.getScreenshot();

      if (!imageSrc) return;

      const { data } = await API.bookAPI.getBooksByExpression({
        imageString64: imageSrc,
        take: 10,
      });

      setEmotion(data.expression);
      setBooks(data.books);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container h="100vh" maxW="100%" py={8}>
      <Flex
        flexDir={['column', 'column', 'column', 'row']}
        w="100%"
        h="100%"
        alignItems={['center', 'center', 'center', 'flex-start']}
        gap="8"
      >
        <VStack gap="4" w="100%">
          <Text as="h3">
            {emotion
              ? ` you look ${emotion} ${emotion_labels[emotion]} now`
              : 'Take a selfie 📸'}
          </Text>

          <Camera webcamRef={webcamRef} canvasRef={canvasRef} />
          <Button
            rightIcon={<FaCamera />}
            colorScheme="facebook"
            variant="solid"
            onClick={captureHandler}
          >
            Mood Assistant
          </Button>
        </VStack>

        <Flex w={'100%'} gap="8" flexDir={['column']}>
          <Text as="h3" textAlign={'center'} w="100%">
            Recommended book
          </Text>

          {isLoading && (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              alignSelf={'center'}
            />
          )}

          {!isLoading && books.length > 0 && (
            <Grid
              templateColumns={[
                'repeat(2, 1fr)',
                'repeat(3, 1fr)',
                'repeat(3, 1fr)',
                'repeat(2, 1fr)',
              ]}
              gap={6}
            >
              {books.map((book) => (
                <GridItem w="100%" key={book.id}>
                  <BookCard
                    id={book.id}
                    genres={book.genres}
                    title={book.title}
                    image_url_l={book.image_url_l}
                    author={book.author}
                  />
                </GridItem>
              ))}
            </Grid>
          )}

          {!isLoading && books.length === 0 && (
            <Text as="h4" textAlign={'center'}>
              Take a picture 📸 and see what the best books we recommended for
              you today ✨{' '}
            </Text>
          )}
        </Flex>
      </Flex>
    </Container>
  );
}
