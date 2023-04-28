import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Camera from '../components/Camera/Camera';
import { FaCamera } from 'react-icons/fa';
import BookCard from 'src/components/Card/BookCard';

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

  const [emotion, setEmotion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const captureHandler = () => {
    setEmotion('happy');
    // setIsLoading(true);
    // try {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();

    console.log(imageSrc);
    //   setEmotion('happy');
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <Container h='100vh' maxW='100%' py={8}>
      <Flex
        flexDir={['column', 'column', 'column', 'row']}
        w='100%'
        h='100%'
        alignItems={['center', 'center', 'center', 'flex-start']}
        gap='8'
      >
        <VStack gap='4' w='100%'>
          <Text as='h3'>
            {emotion
              ? ` you look ${emotion} ${emotion_labels[emotion]} now`
              : 'Take a selfie 📸'}
          </Text>

          <Camera webcamRef={webcamRef} canvasRef={canvasRef} />
          <Button
            rightIcon={<FaCamera />}
            colorScheme='facebook'
            variant='solid'
            onClick={captureHandler}
          >
            Mood Assistant
          </Button>
        </VStack>

        <Flex w={'100%'} gap='8' flexDir={['column']}>
          <Text as='h3' textAlign={'center'} w='100%'>
            Recommended book
          </Text>

          <Grid
            templateColumns={[
              'repeat(2, 1fr)',
              'repeat(3, 1fr)',
              'repeat(3, 1fr)',
              'repeat(2, 1fr)',
            ]}
            gap={6}
          >
            <GridItem w='100%'>
              <BookCard
                genres={['Fantasy', 'Adventure']}
                title='The Lord of the Rings'
                image_url_l='https://picsum.photos/200'
                author='J.R.R. Tolkien'
              />
            </GridItem>
          </Grid>
        </Flex>
      </Flex>
    </Container>
  );
}
