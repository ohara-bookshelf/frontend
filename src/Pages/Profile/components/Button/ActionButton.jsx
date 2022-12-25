import { Button, HStack } from '@chakra-ui/react';
import React from 'react';

const ActionButton = ({ onDetailClick, onDeleteClick }) => {
  return (
    <HStack gap={6}>
      <Button variant="solid" colorScheme="teal" onClick={onDetailClick}>
        Detail
      </Button>
      <Button variant="solid" colorScheme="red" onClick={onDeleteClick}>
        Delete
      </Button>
    </HStack>
  );
};

export default ActionButton;
