import { Button, HStack, Link } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';

interface IProps {
  path: string;
  onDeleteClick: () => void;
}

const ActionButton = (props: IProps) => {
  const { path, onDeleteClick } = props;

  return (
    <HStack gap={6}>
      <Link as={ReachLink} to={path}>
        <Button variant="solid" colorScheme="teal">
          Detail
        </Button>
      </Link>
      <Button variant="solid" colorScheme="red" onClick={onDeleteClick}>
        Delete
      </Button>
    </HStack>
  );
};

export default ActionButton;
