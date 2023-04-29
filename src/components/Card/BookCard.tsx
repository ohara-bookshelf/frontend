import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Image,
  Link,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';

type Props = {
  id: string;
  title: string;
  image_url_l: string;
  author: string;
  genres: string[];
};

export default function BookCard(props: Props) {
  const { id, title, image_url_l, genres, author } = props;
  return (
    <Link as={ReachLink} to={`/books/${id}`}>
      <Card
        w='100%'
        h='100%'
        transition={'all 0.2s ease-in-out'}
        _hover={{
          cursor: 'pointer',
          bg: 'blackAlpha.300',
        }}
      >
        <CardBody>
          <VStack gap='4'>
            <Text as='h3' textAlign='center'>
              {`${title.slice(0, 50)} ${title.length > 50 ? '...' : ''}`}
            </Text>
            <Image
              w='100%'
              h='8rem'
              src={image_url_l}
              alt={title}
              borderRadius={4}
              objectFit={'contain'}
            />
            <Text as='p' textAlign='center'>
              {author}
            </Text>
          </VStack>
        </CardBody>
        <CardFooter>
          <Box h='16' alignSelf={'start'}>
            {genres.slice(0, 5).map((g, i) => (
              <Tag key={`${id}-tag-${i}`} size='sm' mr={2} mt={2}>
                {g}
              </Tag>
            ))}
            {genres.length > 5 ? (
              <Tag size='sm' mr={2} mt={2}>
                + {genres.length - 5}
              </Tag>
            ) : null}
          </Box>
        </CardFooter>
      </Card>
    </Link>
  );
}
