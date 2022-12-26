import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const DeleteBookshelfModal = ({ name, isOpen, onClose, onClick }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure to delete bookshelf {name} ?</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClick}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBookshelfModal;
