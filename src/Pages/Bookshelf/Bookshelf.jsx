import { Container, Heading } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';

const Bookshelf = () => {
  const { bookshelfId } = useParams();

  return (
    <Container maxW="100%" pl={10}>
      <Heading>asdf</Heading>
      Bookshelf {bookshelfId}
    </Container>
  );
};

export default Bookshelf;
