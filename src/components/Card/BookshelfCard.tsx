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
interface IProps {
  bookshelf: IBookshelf;
  disabled: boolean;
  onDeleteFork: () => void;
  onFork: () => void;
}

const BookshelfCard = (props: IProps) => {
  const { bookshelf, disabled, onDeleteFork, onFork } = props;
  const { user } = useUserStore();
  const { isAuthenticated } = useAuthStore();

  const navigate = useNavigate();

  const isOwner = bookshelf.userId === user.id;
  const isForked = user.forkedshelves?.some(
    (item) => item.bookshelfId === bookshelf.id
  )
    ? true
    : false;

  return (
    <Card
      w='100%'
      h='100%'
      transition={'all 0.2s ease-in-out'}
      _hover={{
        cursor: 'pointer',
        bg: 'blackAlpha.300',
      }}
    >
      <Link as={ReachLink} to={`bookshelves/${bookshelf.id}`}>
        <CardBody>
          <Text textAlign='center' as='h5' mb={6}>
            {`${bookshelf.name.slice(0, 50)}${
              bookshelf.name.length > 50 ? '...' : ''
            }`}
          </Text>

          <Image
            w='100%'
            h={['12rem']}
            mb='4'
            src={logo}
            alt='bookshelf banner'
            objectFit={'cover'}
            borderRadius={4}
          />

          <Text>
            Owner: {bookshelf.owner.firstName} {bookshelf.owner.lastName}
          </Text>

          <Text as='h6'>Books: {bookshelf._count?.books}</Text>

          <Text as='h6'>Total Fork: {bookshelf._count?.userForks}</Text>

          <Text as='h6'>{dateParser(bookshelf.createdAt)}</Text>
        </CardBody>
      </Link>
      <CardFooter>
        {isAuthenticated ? (
          isOwner ? (
            <Button
              variant='solid'
              colorScheme='blue'
              onClick={() => navigate(`/profile/${bookshelf.id}`)}
            >
              Detail
            </Button>
          ) : isForked ? (
            <Button
              disabled={disabled}
              variant='outline'
              colorScheme='red'
              onClick={onDeleteFork}
            >
              Delete Fork
            </Button>
          ) : (
            <Button
              disabled={disabled}
              variant='solid'
              colorScheme='teal'
              onClick={onFork}
            >
              Fork
            </Button>
          )
        ) : (
          <Button
            variant='solid'
            colorScheme='blue'
            onClick={() => navigate(`/bookshelves/${bookshelf.id}`)}
          >
            Detail
          </Button>
        )}
        {/* {isAuthenticated && isOwner ? (
         
        ) : (
          <Button
            disabled={disabled}
            variant='solid'
            colorScheme='teal'
            onClick={onFork}
          >
            Fork
          </Button>
        )} */}
      </CardFooter>
    </Card>
  );
};

export default BookshelfCard;
