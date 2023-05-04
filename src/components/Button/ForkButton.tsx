import { Button, useDisclosure } from '@chakra-ui/react';
import { VscRepoForked } from 'react-icons/vsc';
import { MdCancel } from 'react-icons/md';
import { useAuthStore, useUserStore } from 'src/flux/store';
import { IBookshelf } from 'src/shared/interfaces';
import * as API from 'src/api';

export default function ForkButton({
  isForked,
  bookshelf,
  variant = 'solid',
}: {
  isForked: boolean;
  bookshelf: IBookshelf;
  variant?: string;
}) {
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

  return (
    <Button
      isLoading={isOpen}
      leftIcon={isForked ? <MdCancel /> : <VscRepoForked />}
      colorScheme="facebook"
      variant={variant}
      display={
        isAuthenticated && user.id !== bookshelf.owner.id ? 'block' : 'none'
      }
      onClick={isForked ? handleUnfork : handleFork}
    >
      {isForked ? 'Unfork' : 'Fork'}
    </Button>
  );
}
