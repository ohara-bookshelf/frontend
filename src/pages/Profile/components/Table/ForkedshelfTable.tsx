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
import ActionButton from '../Button/ActionButton';
import { IForkedshelf } from 'src/shared/interfaces';
import { dateParser } from 'src/shared/utils/parser';
import { PAGE_PATH } from 'src/shared/constants';
import * as API from 'src/api';
import { useUserStore } from 'src/flux/store';

interface IProps {
  data: IForkedshelf[];
}

const ForkedshelfTable = (props: IProps) => {
  const { data } = props;
  const { deleteUserForkshelf } = useUserStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteForkshelfHandler = async (id: string) => {
    onOpen();
    try {
      const { data } = await API.userAPI.deleteForkshelf(id);
      deleteUserForkshelf(data);
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
              <Th>Owner</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.id}>
                <Td>{item?.bookshelf?.name}</Td>
                <Td>{item?.bookshelf?._count?.userForks}</Td>
                <Td>{item?.bookshelf?._count?.books}</Td>
                <Td>
                  {item?.bookshelf?.createdAt
                    ? dateParser(item?.bookshelf?.createdAt)
                    : ''}
                </Td>
                <Td>
                  {item?.bookshelf?.owner?.firstName}{' '}
                  {item?.bookshelf?.owner?.lastName}
                </Td>
                <Td>
                  <ActionButton
                    isLoading={isOpen}
                    path={PAGE_PATH.USER_FORKSHELF(item.id)}
                    onDeleteClick={() => deleteForkshelfHandler(item.id)}
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
