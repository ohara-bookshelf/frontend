import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { dateParser } from 'src/shared/utils/parser';
import logo from 'src/shared/assets/images/bookshelf.png';
interface IProps {
  bookshelf: any;
  owner: any;
  forked: any;
  user: any;
  disabled: boolean;
  onDeleteFork: any;
  onFork: any;
}

const BookshelfCard = (props: IProps) => {
  const { bookshelf, owner, forked, user, disabled, onDeleteFork, onFork } =
    props;

  const navigate = useNavigate();
  return (
    <Card minW="20rem" maxW={['100%', '20rem']} h="100%">
      <CardBody>
        <Text textAlign="center" as="h5" mb={6}>
          {bookshelf.name}
        </Text>

        <Image
          w="100%"
          h={['12rem']}
          mb="4"
          src={bookshelf.banner ? bookshelf.banner : logo}
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
      <CardFooter>
        {!user ? null : owner ? (
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => navigate(`/profile/${bookshelf.id}`)}
          >
            Detail
          </Button>
        ) : forked ? (
          <Button
            disabled={disabled}
            variant="outline"
            colorScheme="red"
            onClick={onDeleteFork}
          >
            Delete Fork
          </Button>
        ) : (
          <Button
            disabled={disabled}
            variant="solid"
            colorScheme="teal"
            onClick={onFork}
          >
            Fork
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookshelfCard;
