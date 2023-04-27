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
import { useState } from 'react';
import * as API from 'src/api';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  defaultState: any;
  addBooksHandler: (selectedBooks: any) => void;
}

const AddBookModal = (props: IProps) => {
  const { isOpen, onClose, defaultState, addBooksHandler } = props;

  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selectedBooks, setSelectedBooks] = useState(defaultState);

  const fetchBooks = async (title: string) => {
    const queryString = new URLSearchParams({
      title,
    }).toString();

    try {
      const { data } = await API.bookAPI.findBooks(queryString);

      const options = data.map((book: any) => ({
        value: book.id,
        label: book.title,
      }));

      setOptions(options);
    } catch (error) {
      console.error(error);
    }
  };

  let timeoutId: NodeJS.Timeout;

  const inputchangeHandler = (newValue: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      if (newValue.length < 3) return;

      fetchBooks(newValue);
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Bookshelf</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select
            defaultValue={selectedBooks}
            isMulti
            name="books"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={setSelectedBooks}
            onInputChange={inputchangeHandler}
          />
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
