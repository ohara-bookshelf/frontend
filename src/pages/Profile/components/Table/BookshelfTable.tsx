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
import { PAGE_PATH } from 'src/shared/constants';
import ForkButton from 'src/components/Button/ForkButton';

interface IProps {
  data: IBookshelf[];
}

const BookshelfTable = (props: IProps) => {
  const { data } = props;

  const [bookshelf, setBookshelf] = useState<IBookshelf>();
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, deleteUserBookshelf } = useUserStore();

  const isOwner = data.some((item) => item.userId === user?.id);

  const deleteBookshelfHandler = async () => {
    if (!bookshelf) return;
    setIsLoading(true);
    try {
      const { data } = await API.userAPI.deleteUserBookshelf(bookshelf.id);
      console.log(data);
      deleteUserBookshelf(data.bookshelfId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
              {user && <Th>Action</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {data.length
              ? data.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.name}</Td>
                    <Td>{item._count?.userForks || 0}</Td>
                    <Td>{item._count?.books || 0}</Td>
                    <Td>{dateParser(item.createdAt)}</Td>
                    {user && isOwner ? (
                      <Td>
                        <ActionButton
                          isLoading={isLoading}
                          path={PAGE_PATH.USER_BOOKSHELF(item.id)}
                          onDeleteClick={() => {
                            setBookshelf(item);
                            onOpen();
                          }}
                        />
                      </Td>
                    ) : (
                      <Td width={'10rem'}>
                        <ForkButton bookshelf={item} />
                      </Td>
                    )}
                  </Tr>
                ))
              : null}
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
