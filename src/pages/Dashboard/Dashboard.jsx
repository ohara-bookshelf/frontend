import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import * as api from '../../api';

function Dashboard() {
  const {
    data: bookshelves,
    error,
    status: bookshelfStatus,
  } = useQuery('bookshelves', api.getPopularBookshelf);

  const { data: user } = useQuery('user', api.getUserDetail);

  const renderForkButton = (bookshelf) => {
    if (!user) {
      return null;
    }

    if (user.forkedshelves?.some((item) => item.bookshelfId === bookshelf.id)) {
      return (
        <Button variant="solid" colorScheme="teal">
          Unfork
        </Button>
      );
    }

    if (user?.id === bookshelf?.owner?.id) {
      return (
        <Button variant="solid" colorScheme="teal">
          Edit
        </Button>
      );
    }

    if (user?.id !== bookshelf?.owner?.id) {
      return (
        <Button variant="solid" colorScheme="teal">
          Fork
        </Button>
      );
    }
  };

  return (
    <Container maxW="100%" pl={10}>
      <Stack spacing={10}>
        <Text as="h2">Popular Bookshelves</Text>
        <Box width="100%" my="6">
          {bookshelfStatus === 'loading' && <div>Loading...</div>}
          {bookshelfStatus === 'error' && <div>Error: {error.message}</div>}
          {bookshelfStatus === 'success' && (
            <HStack maxH="100%" overflow="auto">
              {' '}
              {bookshelves.map((bookshelf) => (
                <Card minW="sm" key={bookshelf.id}>
                  <CardBody
                    _hover={{
                      cursor: 'pointer',
                      boxShadowa: 'lg',
                    }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      alt="Green double couch with wooden legs"
                      borderRadius="lg"
                    />
                    <Stack mt="6" spacing="3">
                      <Heading size="md">{bookshelf.name}</Heading>
                      <Text h="100px">
                        {bookshelf.description.substring(0, 150)}{' '}
                        <Text as="span" color="blue.600">
                          ...Read more
                        </Text>
                      </Text>
                      <Text>
                        total forks:{' '}
                        <Text as="span" color="blue.600">
                          {' '}
                          {bookshelf._count.userForks}
                        </Text>
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      {renderForkButton(bookshelf)}
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              ))}
            </HStack>
          )}
        </Box>
        <Box>
          <Link to="/bookshelves">See all bookshelves</Link>
        </Box>
        {/* Recomended Books */}
        <Box>
          <h2>Recomended Books</h2>
        </Box>

        {/* Recomended Authors */}
        <Box>
          <h2>Recomended Authors</h2>
        </Box>

        {/* Recomended Bookshelves */}
        <Box>
          <h2>Recomended Bookshelves</h2>
        </Box>
      </Stack>
    </Container>
  );
}

export default Dashboard;
