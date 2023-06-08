import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { dateParser } from 'src/shared/utils/parser';
import logo from 'src/shared/assets/images/ohara.png';
import { useAuthStore, useUserStore } from 'src/flux/store';
import { IBookshelf } from 'src/shared/interfaces';
import { Link as ReachLink } from 'react-router-dom';
import { PAGE_PATH } from 'src/shared/constants';

import ForkButton from '../Button/ForkButton';
interface IProps {
  bookshelf: IBookshelf;
}

const BookshelfCard = (props: IProps) => {
  const { bookshelf } = props;
  const { user } = useUserStore();
  const { isAuthenticated } = useAuthStore();

  const navigate = useNavigate();

  const isOwner = bookshelf.userId === user.id;

  return (
    <Card
      w="100%"
      h="100%"
      transition={'all 0.2s ease-in-out'}
      _hover={{
        cursor: 'pointer',
        bg: 'blackAlpha.300',
      }}
    >
      <Link
        as={ReachLink}
        to={
          isOwner
            ? PAGE_PATH.USER_BOOKSHELF(bookshelf.id)
            : PAGE_PATH.BOOKSHELF(bookshelf.id)
        }
      >
        <CardBody>
          <VStack mb="6">
            <Text textAlign="center" as="h5" h="4rem">
              {`${bookshelf.name.slice(0, 50)}${
                bookshelf.name.length > 50 ? '...' : ''
              }`}
            </Text>

            <Image
              w="75%"
              // h={['18rem']}
              mb="4"
              src={logo}
              alt="bookshelf banner"
              objectFit={'cover'}
              borderRadius={4}
            />
          </VStack>

          <VStack mb="4" alignItems={'start'}>
            <Text>
              Owner: {bookshelf.owner.firstName} {bookshelf.owner.lastName}
            </Text>
            <Text>Books: {bookshelf._count?.books}</Text>
            <Text>Total Fork: {bookshelf._count?.userForks}</Text>
            <Text>{dateParser(bookshelf.createdAt)}</Text>
          </VStack>
        </CardBody>
      </Link>
      <CardFooter>
        {isAuthenticated ? (
          isOwner ? (
            <Button
              variant="outline"
              colorScheme="facebook"
              onClick={() => navigate(PAGE_PATH.USER_BOOKSHELF(bookshelf.id))}
            >
              Edit
            </Button>
          ) : (
            <ForkButton bookshelf={bookshelf} />
          )
        ) : (
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => navigate(PAGE_PATH.BOOKSHELF(bookshelf.id))}
          >
            Detail
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookshelfCard;
