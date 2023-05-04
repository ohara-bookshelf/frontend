import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { dateParser } from 'src/shared/utils/parser';
import logo from 'src/shared/assets/images/bookshelf.png';
import { useAuthStore, useUserStore } from 'src/flux/store';
import { IBookshelf } from 'src/shared/interfaces';
import { Link as ReachLink } from 'react-router-dom';
import { PAGE_PATH } from 'src/shared/constants';
import { useState } from 'react';
import * as API from 'src/api';
interface IProps {
  bookshelf: IBookshelf;
}

const BookshelfCard = (props: IProps) => {
  const { bookshelf } = props;
  const { user, deleteUserForkshelf, onUserForkshelf } = useUserStore();
  const { isAuthenticated } = useAuthStore();

  const navigate = useNavigate();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isForking, setIsForking] = useState(false);

  const isOwner = bookshelf.userId === user.id;
  const isForked = user.forkedshelves?.some(
    (item) => item.bookshelfId === bookshelf.id
  )
    ? true
    : false;

  const forkHandler = async () => {
    setIsForking(true);
    try {
      const { data } = await API.userAPI.forkBookshelf(bookshelf.id);
      onUserForkshelf(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsForking(false);
    }
  };

  const deleteForkHandler = async () => {
    setIsDeleting(true);
    try {
      const forkshelfId = user.forkedshelves?.find(
        (x) => x.bookshelfId === bookshelf.id
      )?.id;

      if (!forkshelfId) return;

      const { data } = await API.userAPI.deleteForkshelf(forkshelfId);

      deleteUserForkshelf(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

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
          <Text textAlign="center" as="h5" mb={6}>
            {`${bookshelf.name.slice(0, 50)}${
              bookshelf.name.length > 50 ? '...' : ''
            }`}
          </Text>

          <Image
            w="100%"
            h={['12rem']}
            mb="4"
            src={logo}
            alt="bookshelf banner"
            objectFit={'cover'}
            borderRadius={4}
          />

          <Text>
            Owner: {bookshelf.owner.firstName} {bookshelf.owner.lastName}
          </Text>

          <Text as="h6">Books: {bookshelf._count?.books}</Text>

          <Text as="h6">Total Fork: {bookshelf._count?.userForks}</Text>

          <Text as="h6">{dateParser(bookshelf.createdAt)}</Text>
        </CardBody>
      </Link>
      <CardFooter>
        {isAuthenticated ? (
          isOwner ? (
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => navigate(PAGE_PATH.USER_BOOKSHELF(bookshelf.id))}
            >
              Edit
            </Button>
          ) : isForked ? (
            <Button
              isLoading={isDeleting}
              variant="outline"
              colorScheme="red"
              onClick={deleteForkHandler}
            >
              Delete Fork
            </Button>
          ) : (
            <Button
              isLoading={isForking}
              variant="solid"
              colorScheme="teal"
              onClick={forkHandler}
            >
              Fork
            </Button>
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
