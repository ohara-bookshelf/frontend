import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useUserStore } from 'src/flux/store';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onHandleSubmit: () => void;
};

export default function AddBookModal(props: Props) {
  const { isOpen, onClose, onHandleSubmit } = props;

  const { user } = useUserStore();

  const [options, setOptions] = useState<{ value: string; option: string }[]>(
    []
  );
  const [bookshelfName, setBookshelfName] = useState('');
  const [bookshelfId, setBookshelfId] = useState('');
  const [isCreate, setIsCreate] = useState(true);
  // const bookshelves = [...user?.bookshelves?.private ?? [], ...user?.bookshelves?.public ?? []];

  useEffect(() => {
    const bookshelves = [
      ...(user?.bookshelves?.private ?? []),
      ...(user?.bookshelves?.public ?? []),
    ];
    setOptions(
      bookshelves.map((bookshelf) => {
        return { value: bookshelf.id, option: bookshelf.name };
      })
    );
  }, [user?.bookshelves?.private, user?.bookshelves?.public]);

  useEffect(() => {
    if (options.length < 1) setIsCreate(false);
  }, [options]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(15deg)" />
      <ModalContent>
        <ModalHeader>Add Book To Bookshelf</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isCreate ? (
            <Input
              placeholder="Create New Bookshelf"
              value={bookshelfName}
              onChange={(e) => setBookshelfName(e.target.value)}
            />
          ) : (
            <Select
              placeholder="Select Bookshelf"
              onChange={(e) => setBookshelfId(e.target.value)}
            >
              {options.map((el) => (
                <option key={el.value} value={el.value}>
                  {el.option}
                </option>
              ))}
            </Select>
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" colorScheme="red" mr={3} onClick={onClose}>
            cancel
          </Button>
          <Button
            isDisabled={!bookshelfId && !bookshelfName}
            variant="solid"
            colorScheme="twitter"
            onClick={onHandleSubmit}
          >
            Add To Bookshelf
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
