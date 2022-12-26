import React from 'react';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import ActionButton from '../Button/ActionButton';
import dateParser from '../../../../shared/utils/dateParser';

const ForkedshelfTable = ({ data }) => {
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
              <Th>Owner</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.id}>
                <Td>{item.bookshelf.name}</Td>
                <Td>{item.bookshelf._count?.userForks}</Td>
                <Td>{item.bookshelf._count?.books}</Td>
                <Td>{dateParser(item.bookshelf.createdAt)}</Td>
                <Td>
                  {item.bookshelf.owner.firstName}{' '}
                  {item.bookshelf.owner.lastName}
                </Td>
                <Td>
                  <ActionButton
                    path={item.bookshelf.id}
                    onDeleteClick={() => {}}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ForkedshelfTable;
