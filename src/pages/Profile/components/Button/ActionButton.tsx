import { Button, HStack, Link } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';

interface IProps {
  path: string;
  isLoading: boolean;
  onDeleteClick: () => void;
}

const ActionButton = (props: IProps) => {
  const { path, isLoading, onDeleteClick } = props;

  return (
    <HStack gap={6}>
      <Link as={ReachLink} to={path}>
        <Button disabled={isLoading} variant="solid" colorScheme="facebook">
          Detail
        </Button>
      </Link>
      <Button
        disabled={isLoading}
        variant="solid"
        colorScheme="red"
        onClick={onDeleteClick}
      >
        Delete
      </Button>
    </HStack>
  );
};

export default ActionButton;
