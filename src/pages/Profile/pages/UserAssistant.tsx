import {
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Spinner,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { CSSProperties, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Camera from '../components/Camera/Camera';
import { FaCamera } from 'react-icons/fa';
import BookCard from 'src/components/Card/BookCard';
import * as API from 'src/api';
import { IBook } from 'src/shared/interfaces';
import { EMOTION_COLOR, EMOTION_LABELS } from 'src/shared/constants';

export default function UserAssistant() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [books, setBooks] = useState<IBook[]>([]);
  const [emotion, setEmotion] = useState<string>('neutral');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [genres, setGenres] = useState<string[]>([]);

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
      setGenres(data.genres);
    } catch (error) {
      console.error(error);
      setEmotion('');
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      maxW="100%"
      py={8}
      style={
        {
          '--chakra-colors-primary-500':
            EMOTION_COLOR[emotion] || EMOTION_COLOR['neutral'],
        } as CSSProperties
      }
    >
      <Flex
        flexDir={['column', 'column', 'column', 'row']}
        w="100%"
        h="100%"
        alignItems={['center', 'center', 'center', 'flex-start']}
        gap="8"
        position="relative"
      >
        <VStack
          position={{
            lg: 'sticky',
          }}
          top="8"
          left="0"
          w="100%"
        >
          <Text as="h3">
            {emotion
              ? ` you look ${emotion} ${EMOTION_LABELS[emotion]} now`
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

          <Text as="h3" textAlign={'center'} w="100%">
            Reccomended book genres
          </Text>

          <Flex
            gap="4"
            flexWrap={'wrap'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            {genres.map((g, i) => (
              <Tag
                key={`tag-${i}-${new Date().getDate()}`}
                colorScheme="facebook"
                size="sm"
                mr={2}
                mt={2}
              >
                {g}
              </Tag>
            ))}
          </Flex>
        </VStack>

        <Flex w={'100%'} gap="8" flexDir={['column']} position={'relative'}>
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
                'repeat(1, 1fr)',
                'repeat(2, 1fr)',
                'repeat(3, 1fr)',
                'repeat(2, 1fr)',
              ]}
              gap={6}
            >
              {books.map((book) => (
                <GridItem w="100%" key={book.id}>
                  <BookCard book={book} />
                </GridItem>
              ))}
            </Grid>
          )}

          {!isLoading && books.length === 0 && (
            <Text as="h4" textAlign={'center'}>
              Take a picture 📸 and see what the best books we recommended for
              you today ✨
            </Text>
          )}
        </Flex>
      </Flex>
    </Container>
  );
}
