import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Image,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useId } from 'react';
import { IBook } from 'src/shared/interfaces';

type Props = {
  title: string;
  image_url_l: string;
  author: string;
  genres: string[];
};

export default function BookCard(props: Props) {
  const { title, image_url_l, genres, author } = props;
  const uuid = useId();
  return (
    <Card w='100%' h='100%'>
      <CardBody>
        <VStack gap='4'>
          <Text as='h3' textAlign='center'>
            {title}
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
        <Box alignSelf={'start'}>
          {genres.slice(0, 5).map((g) => (
            <Tag key={uuid} size='sm' mr={2} mt={2}>
              {g}
            </Tag>
          ))}
          {genres.length > 5 ? (
            <Tag key={uuid} size='sm' mr={2} mt={2}>
              + {genres.length - 5}
            </Tag>
          ) : null}
        </Box>
      </CardFooter>
    </Card>
  );
}
