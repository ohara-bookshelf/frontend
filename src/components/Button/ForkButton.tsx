import { Button } from '@chakra-ui/react';
import { VscRepoForked } from 'react-icons/vsc';
import { MdCancel } from 'react-icons/md';
import { useAuthStore, useUserStore } from 'src/flux/store';
import { IBookshelf } from 'src/shared/interfaces';
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
  const { user } = useUserStore();

  return (
    <Button
      leftIcon={isForked ? <MdCancel /> : <VscRepoForked />}
      colorScheme="facebook"
      variant={variant}
      display={
        isAuthenticated && user.id !== bookshelf.owner.id ? 'block' : 'none'
      }
    >
      {isForked ? 'Unfork' : 'Fork'}
    </Button>
  );
}
