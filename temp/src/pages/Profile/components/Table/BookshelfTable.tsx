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
import DeleteBookshelfModal from '../Modal/DeleteBookshelfModal';
import { IBookshelf } from 'src/shared/interfaces';
import ActionButton from '../Button/ActionButton';
import { dateParser } from 'src/shared/utils/parser';

interface IProps {
  data: IBookshelf[];
}

const bookshelf = {
  id: 1,
  name: 'Bookshelf 1',
  totalFork: 10,
  totalBook: 10,
  createdAt: '2021-08-01T00:00:00.000Z',
};

const BookshelfTable = (props: IProps) => {
  const { data } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDeleteBookshelf = () => {
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
