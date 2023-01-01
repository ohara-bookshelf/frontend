import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import * as api from '../../../../api';

const AddBookModal = ({ isOpen, onClose, defaultState, addBooksHandler }) => {
  const [options, setOptions] = useState(null);
  const [selectedBooks, setSelectedBooks] = useState(defaultState);
  const { isLoading } = useQuery('books', api.getAllBooks, {
    onSuccess: (data) => {
      setOptions(data.map((book) => ({ value: book.id, label: book.title })));
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Bookshelf</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            'Loading...'
          ) : (
            <Select
              defaultValue={selectedBooks}
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={setSelectedBooks}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            onClick={() => {
              addBooksHandler(selectedBooks);
            }}
          >
            Add Books
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBookModal;
