import { Button, HStack, Link } from '@chakra-ui/react';
import React from 'react';
import { Link as ReachLink } from 'react-router-dom';

const ActionButton = ({ path, onDeleteClick }) => {
  return (
    <HStack gap={6}>
      <Link as={ReachLink} to={`/profile/${path}`}>
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
