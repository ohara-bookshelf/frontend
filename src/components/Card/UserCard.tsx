import {
  Card,
  CardBody,
  Avatar,
  Link,
  Flex,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import { PAGE_PATH } from 'src/shared/constants';
import { IUserProfile } from 'src/shared/interfaces';

type Props = {
  user: IUserProfile;
};

export default function BookCard(props: Props) {
  const { id, firstName, lastName, profileImgUrl, _count } = props.user;

  return (
    <Link as={ReachLink} to={PAGE_PATH.USER(id)}>
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
            <Text as="h5" textAlign="center" height="2rem">
              {firstName} {lastName}
            </Text>

            <Avatar
              size="xl"
              name={`${firstName} ${lastName}`}
              src={profileImgUrl}
              borderWidth="3px"
              borderStyle="solid"
              borderColor="primary.500"
            />

            <Flex w="100%" justifyContent="space-around">
              <Text>{_count.forkedshelves} forks</Text>
              <Text>{_count.bookshelves} bookshelves</Text>
            </Flex>
          </VStack>
        </CardBody>
      </Card>
    </Link>
  );
}
