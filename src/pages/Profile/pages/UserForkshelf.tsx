import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as API from 'src/api';
import { PAGE_PATH } from 'src/shared/constants';
import { IUserForkshelf } from 'src/shared/interfaces';

const UserForkshelf = () => {
  const { forkshelfId } = useParams();
  const navigate = useNavigate();

  const [forkedshelf, setForkedshelf] = useState<IUserForkshelf>();

  useEffect(() => {
    const fetchForkedshelf = async () => {
      if (!forkshelfId) return;
      try {
        const { data } = await API.userAPI.getUserForkshelf(forkshelfId);
        setForkedshelf(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchForkedshelf();
  }, [forkshelfId]);

  if (!forkedshelf) return null;

  return (
    <Container minW="100%" pl={10} py={8}>
      <Stack gap={6}>
        <Heading textAlign="center">{forkedshelf.bookshelf.name}</Heading>
        <HStack justifyContent="center" gap={6}>
          <Text>Total Book: {forkedshelf.bookshelf._count?.books || 0}</Text>
          <Text>
            Total Fork: {forkedshelf.bookshelf._count?.userForks || 0}
          </Text>
        </HStack>
        <Flex justifyContent="center">
          <Button
            colorScheme="red"
            variant="outline"
            onClick={() => console.log(forkshelfId)}
          >
            Delete
          </Button>
        </Flex>
        <Flex flexDir="row" gap={20}>
          <Flex w="100%" flexDir="column" alignItems="center" gap={6}>
            <Text as="h4">Original Bookshelf Owner</Text>
            <Avatar
              size="2xl"
              src={forkedshelf.bookshelf.owner.profileImgUrl}
              name={`${forkedshelf.bookshelf.owner.firstName} ${forkedshelf.bookshelf.owner.lastName}`}
            />
            <Text as="h3" color="teal.300">
              {forkedshelf.bookshelf.owner.firstName}{' '}
              {forkedshelf.bookshelf.owner.lastName}
            </Text>
            <Text as="p" textAlign="center" fontStyle="italic">
              {forkedshelf.bookshelf.description}
            </Text>
          </Flex>
          <Flex w="100%" flexDir="column" gap={6}>
            <Text as="h4">Forked By</Text>
            <Box h={80} overflow="auto">
              <Stack gap={6}>
                {forkedshelf?.bookshelf?.userForks?.map(({ reader }) => {
                  const name = `${reader.firstName} ${reader.lastName}`;
                  return (
                    <Box
                      key={reader.id}
                      w="100%"
                      p={6}
                      borderRadius="6"
                      background="blackAlpha.300"
                    >
                      <Flex flexDir="row" alignItems="center" gap={6}>
                        <Avatar
                          size="md"
                          src={reader.profileImgUrl}
                          name={name}
                        />
                        <Text as="h4" color="teal.300">
                          {name}
                        </Text>
                      </Flex>
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          </Flex>
        </Flex>

        <Text as="h2" textAlign="center">
          Books
        </Text>

        <Card>
          <CardBody>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ISBN</Th>
                    <Th>Title</Th>
                    <Th>Author</Th>
                    <Th>Publisher</Th>
                    <Th isNumeric>Year</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {forkedshelf?.bookshelf?.books?.map(({ book }) => {
                    return (
                      <Tr
                        key={book.id}
                        transition={'all .2s ease-in-out'}
                        _hover={{
                          cursor: 'pointer',
                          background: 'facebook.900',
                        }}
                        onClick={() => navigate(PAGE_PATH.BOOK(book.id))}
                      >
                        <Td width={4}>{book.isbn}</Td>
                        <Td>
                          {`${book.title.slice(0, 50)}${
                            book.title.length > 50 ? ' ...' : ''
                          }`}
                        </Td>
                        <Td>{book.author}</Td>
                        <Td>{book.publisher}</Td>
                        <Td isNumeric>{book.year_of_publication}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </Stack>
    </Container>
  );
};

export default UserForkshelf;
