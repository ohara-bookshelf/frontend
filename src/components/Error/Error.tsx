import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import popcorn from 'src/shared/assets/gif/working-chicken.gif';
import { PAGE_PATH } from 'src/shared/constants';

export default function Error() {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      bottom={0}
      right={0}
      width="100vw"
      height="100vh"
      background="rgba(0,0,0,0.75)"
      zIndex="modal"
    >
      <Flex
        width="100%"
        height="100%"
        px={10}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap={6}
      >
        <Image
          w="300px"
          h="300px"
          maxW="100%"
          maxH="100%"
          objectFit="cover"
          objectPosition="center"
          src={popcorn}
          alt="loading"
        />
        <Text mt={6} textAlign="center" as="h5">
          Some Error Acquired~! We are trying to fix it. Please refresh the page
          or return to{' '}
          <Link
            color="teal"
            textDecor="underline"
            as={ReachLink}
            to={PAGE_PATH.MAIN}
          >
            {' '}
            home page
          </Link>
        </Text>
      </Flex>
    </Box>
  );
}
