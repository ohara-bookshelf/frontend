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
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import dateParser from '../../../../shared/utils/dateParser';
import ActionButton from '../Button/ActionButton';
import * as api from '../../../../api';
import DeleteBookshelfModal from '../Modal/DeleteBookshelfModal';

const BookshelfTable = ({ data }) => {
  const queryClient = useQueryClient('user');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [bookshelf, setBookshelf] = useState({});

  const deleteBookshelf = useMutation(api.deleteBookshelf, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
  });

  const onDeleteBookshelf = () => {
    deleteBookshelf.mutate(bookshelf.id);
    onClose();
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
            {data.map((item) => (
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
        name={bookshelf.name}
        isOpen={isOpen}
        onClose={onClose}
        onClick={onDeleteBookshelf}
      />
    </>
  );
};

export default BookshelfTable;
