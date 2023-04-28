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
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useId } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const forkedshelf = {
  id: 1,
  bookshelf: {
    id: 1,
    name: 'Bookshelf 1',
    description: 'This is a bookshelf.',
    visible: 'PRIVATE',
    userForks: [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        profileImgUrl: 'https://picsum.photos/200',
      },
    ],
    books: [
      {
        id: 1,
        title: 'Book 1',
        image_url_l: 'https://picsum.photos/200',
        genres: ['Action'],
      },
    ],
    owner: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      profileImgUrl: 'https://picsum.photos/200',
    },
    _count: {
      books: 10,
      userForks: 10,
    },
    createdAt: '2021-10-10T00:00:00.000Z',
  },
};

const UserForkshelf = () => {
  const { forkshelfId } = useParams();
  const uuid = useId();
  const navigate = useNavigate();

  return (
    <Container minW='100%' pl={10} py={8}>
      <Stack gap={6}>
        <Heading textAlign='center'>{forkedshelf.bookshelf.name}</Heading>
        <HStack justifyContent='center' gap={6}>
          <Text>Total Book: {forkedshelf.bookshelf._count?.books || 0}</Text>
          <Text>
            Total Fork: {forkedshelf.bookshelf._count?.userForks || 0}
          </Text>
        </HStack>
        <Flex justifyContent='center'>
          <Button
            colorScheme='red'
            variant='outline'
            onClick={() => console.log(forkshelfId)}
          >
            Delete
          </Button>
        </Flex>
        <Flex flexDir='row' gap={20}>
          <Flex w='100%' flexDir='column' alignItems='center' gap={6}>
            <Text as='h4'>Original Bookshelf Owner</Text>
            <Avatar
              size='2xl'
              src={forkedshelf.bookshelf.owner.profileImgUrl}
              name={`${forkedshelf.bookshelf.owner.firstName} ${forkedshelf.bookshelf.owner.lastName}`}
            />
            <Text as='h3' color='teal.300'>
              {forkedshelf.bookshelf.owner.firstName}{' '}
              {forkedshelf.bookshelf.owner.lastName}
            </Text>
            <Text as='p' textAlign='center' fontStyle='italic'>
              {forkedshelf.bookshelf.description}
            </Text>
          </Flex>
          <Flex w='100%' flexDir='column' gap={6}>
            <Text as='h4'>Forked By</Text>
            <Box h={80} overflow='auto'>
              <Stack gap={6}>
                {forkedshelf?.bookshelf?.userForks?.map(({ reader }) => {
                  const name = `${reader.firstName} ${reader.lastName}`;
                  return (
                    <Box
                      key={reader.id}
                      w='100%'
                      p={6}
                      borderRadius='6'
                      background='blackAlpha.300'
                    >
                      <Flex flexDir='row' alignItems='center' gap={6}>
                        <Avatar
                          size='md'
                          src={reader.profileImgUrl}
                          name={name}
                        />
                        <Text as='h4' color='teal.300'>
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

        <Text as='h2' textAlign='center'>
          Books
        </Text>

        <Card>
          <CardBody>
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>Thumbnail</Th>
                    <Th>Title</Th>
                    <Th>Author</Th>
                    <Th>Publisher</Th>
                    <Th>Year</Th>
                    <Th>Genres</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {forkedshelf?.bookshelf?.books?.map(({ book }) => {
                    return (
                      <Tr key={book.id}>
                        <Td width={4}>
                          <Avatar
                            size='sm'
                            src={book.image_url_s}
                            name={book.title}
                          />
                        </Td>
                        <Td>{book.title}</Td>
                        <Td>{book.author}</Td>
                        <Td>{book.publisher}</Td>
                        <Td>{book.year_of_publication}</Td>
                        <Td>
                          <HStack spacing='2'>
                            {book.genres.map((genre) => (
                              <Tag
                                key={uuid}
                                size='sm'
                                variant='solid'
                                colorScheme='teal'
                              >
                                {genre}
                              </Tag>
                            ))}
                          </HStack>
                        </Td>
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
