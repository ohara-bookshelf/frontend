import { Card, CardBody, Flex, Text, VStack } from '@chakra-ui/react';
import { IBookReview } from 'src/shared/interfaces';
import Rating from '../Rating/Rating';

interface IProps {
  review: IBookReview;
  onReview: (review: IBookReview) => void;
}

export default function BookReviewCard(props: IProps) {
  const { review, onReview } = props;

  return (
    <Card
      w="100%"
      h="100%"
      transition={'all 0.2s ease-in-out'}
      _hover={{
        cursor: 'pointer',
        bg: 'blackAlpha.300',
      }}
      onClick={() => onReview(review)}
    >
      <CardBody textAlign="center">
        <VStack gap="6">
          <Text as="h3" textAlign="center">
            {review.user}
          </Text>
          <Rating code="card" length={+review.rating} />

          <Flex w="100%" justifyContent={'space-around'}>
            <Text>review point: {Math.floor(review.compound * 10)}</Text>
            <Text>overall review: {review.label}</Text>
          </Flex>
        </VStack>
      </CardBody>
    </Card>
  );
}
