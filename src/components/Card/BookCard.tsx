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
import React, { useId } from 'react';
import { IBook } from 'src/shared/interfaces';

export default function BookCard({ book }: { book: IBook }) {
  const uuid = useId();
  return (
    <Card minW={['16rem', '18rem']} maxW={['100%', '16rem', '18rem']} h="100%">
      <CardBody>
        <VStack gap="4">
          <Text as="h3" textAlign="center">
            {book.title}
          </Text>
          <Image
            w="100%"
            h="8rem"
            src={book.image_url_l}
            alt={book.title}
            borderRadius={4}
            objectFit={'contain'}
          />
        </VStack>
      </CardBody>
      <CardFooter>
        <Box alignSelf={'start'}>
          {book.genres.slice(0, 5).map((g) => (
            <Tag key={uuid} size="sm" mr={2} mt={2}>
              {g}
            </Tag>
          ))}
          {book.genres.length > 5 ? (
            <Tag key={uuid} size="sm" mr={2} mt={2}>
              + {book.genres.length - 5}
            </Tag>
          ) : null}
        </Box>
      </CardFooter>
    </Card>
  );
}
