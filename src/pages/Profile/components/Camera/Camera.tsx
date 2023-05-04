import { Box } from '@chakra-ui/react';
import Webcam from 'react-webcam';

interface Props {
  webcamRef: React.RefObject<Webcam>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export default function Camera(props: Props) {
  return (
    <Box
      position={'relative'}
      w='100%'
      maxW='40rem'
      h='30rem'
      bg='gray.600'
      rounded={'lg'}
    >
      <Webcam
        ref={props.webcamRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 9,
          width: 'calc(100% - 2rem)',
          height: '100%',
        }}
      />
      <canvas
        ref={props.canvasRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 9,
          width: 'calc(100% - 2rem)',
          height: '100%',
        }}
      />
    </Box>
  );
}
