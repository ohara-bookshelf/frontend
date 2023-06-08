import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { VscRepoForked } from 'react-icons/vsc';
import { MdCancel } from 'react-icons/md';
import { useAuthStore, useUserStore } from 'src/flux/store';
import { IBookshelf } from 'src/shared/interfaces';
import * as API from 'src/api';

export default function ForkButton({ bookshelf }: { bookshelf: IBookshelf }) {
  const { isAuthenticated } = useAuthStore();
  const { user, onUserForkshelf, deleteUserForkshelf } = useUserStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFork = async () => {
    onOpen();
    try {
      const { data } = await API.userAPI.forkBookshelf(bookshelf.id);
      onUserForkshelf(data);
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
    }
  };
  const handleUnfork = async () => {
    onOpen();
    try {
      const forkshelfId = user.forkedshelves?.find(
        (x) => x.bookshelfId === bookshelf.id
      )?.id;

      if (!forkshelfId) return;

      const { data } = await API.userAPI.deleteForkshelf(forkshelfId);

      deleteUserForkshelf(data);
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  const isForked =
    user?.forkedshelves?.some((item) => item.bookshelfId === bookshelf?.id) ||
    false;

  return (
    <Button
      isLoading={isOpen}
      colorScheme={isForked ? 'red' : 'facebook'}
      variant={isForked ? 'outline' : 'solid'}
      display={
        isAuthenticated && user.id !== bookshelf.owner?.id ? 'block' : 'none'
      }
      onClick={isForked ? handleUnfork : handleFork}
    >
      <Flex align="center">
        {isForked ? <MdCancel /> : <VscRepoForked />}
        <Text ml={2}>{isForked ? 'Unfork' : 'Fork'}</Text>
      </Flex>
    </Button>
  );
}
