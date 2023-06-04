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
import { PAGE_PATH } from 'src/shared/constants';
import { IBook } from 'src/shared/interfaces';

type Props = {
  book: IBook;
};

export default function BookCard(props: Props) {
  const { id, title, image_url_l, genres, author } = props.book;
  return (
    <Link as={ReachLink} to={PAGE_PATH.BOOK(id)}>
      <Card
        w="100%"
        h="100%"
        transition={'all 0.2s ease-in-out'}
        _hover={{
          cursor: 'pointer',
          bg: 'blackAlpha.300',
        }}
      >
        <CardBody>
          <VStack gap="4">
            <Text as="h5" textAlign="center" height="4rem">
              {`${title?.slice(0, 50)} ${title?.length > 50 ? '...' : ''}`}
            </Text>
            <Image
              w="100%"
              h="12rem"
              src={image_url_l}
              alt={title}
              borderRadius={4}
              objectFit={'contain'}
            />
            <Text as="p" textAlign="center">
              {author}
            </Text>
          </VStack>
        </CardBody>
        <CardFooter height="8rem">
          <Box alignSelf={'start'}>
            {genres?.slice(0, 5)?.map((g, i) => (
              <Tag key={`${id}-tag-${i}`} size="sm" mr={2} mt={2}>
                {g}
              </Tag>
            ))}
            {genres?.length > 5 ? (
              <Tag size="sm" mr={2} mt={2}>
                + {genres.length - 5}
              </Tag>
            ) : null}
          </Box>
        </CardFooter>
      </Card>
    </Link>
  );
}
