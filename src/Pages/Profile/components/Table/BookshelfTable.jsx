import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import dateParser from '../../../../shared/utils/dateParser';
import ActionButton from '../Button/ActionButton';

const BookshelfTable = ({ data, onDeleteClick }) => {
  return (
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
                <ActionButton path={item.id} onDeleteClick={onDeleteClick} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default BookshelfTable;
