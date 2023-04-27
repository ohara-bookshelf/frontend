import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';

import DeleteBookshelfModal from '../Modal/DeleteBookshelfModal';
import { IBookshelf } from 'src/shared/interfaces';
import ActionButton from '../Button/ActionButton';
import { dateParser } from 'src/shared/utils/parser';
import { useState } from 'react';
import * as API from 'src/api';
import { useUserStore } from 'src/flux/store';

interface IProps {
  data: IBookshelf[];
}

const BookshelfTable = (props: IProps) => {
  const { data } = props;

  const [bookshelf, setBookshelf] = useState<IBookshelf>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deleteUserBookshelf } = useUserStore();

  const deleteBookshelfHandler = async () => {
    if (!bookshelf) return;
    try {
      const { data } = await API.userAPI.deleteUserBookshelf(bookshelf.id);
      deleteUserBookshelf(data.bookshelfId);
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  return (
    <>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Bookshelf Name</Th>
              <Th>Total Fork</Th>
              <Th>Total Book</Th>
              <Th>Created At</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* @ts-ignore */}
            {data.length &&
              data.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.name}</Td>
                  <Td>{item._count?.userForks || 0}</Td>
                  <Td>{item._count?.books || 0}</Td>
                  <Td>{dateParser(item.createdAt)}</Td>
                  <Td>
                    <ActionButton
                      path={item.id}
                      onDeleteClick={() => {
                        setBookshelf(item);
                        onOpen();
                      }}
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <DeleteBookshelfModal
        name={bookshelf?.name || ''}
        isOpen={isOpen}
        onClose={onClose}
        onClick={deleteBookshelfHandler}
      />
    </>
  );
};

export default BookshelfTable;
