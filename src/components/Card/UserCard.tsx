import { Card, CardBody, Link, Flex, Text, VStack } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import { PAGE_PATH } from 'src/shared/constants';
import ProfileAvatar from '../Avatar/ProfileAvatar';
import { IUserProfile } from 'src/shared/interfaces';

type Props = {
  user: IUserProfile;
};

export default function BookCard(props: Props) {
  const { id, firstName, lastName, profileImgUrl, _count, expression } =
    props.user;

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

            <ProfileAvatar
              size="xl"
              name={`${firstName} ${lastName}`}
              src={profileImgUrl}
              expression={expression}
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
