import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { IBookReview } from 'src/shared/interfaces';
import Rating from '../Rating/Rating';

interface IProps {
  review: IBookReview;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookReviewModal(props: IProps) {
  const { review, isOpen, onClose } = props;

  return (
    <Modal
      blockScrollOnMount={true}
      closeOnOverlayClick={true}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader textAlign={'center'}>
          <VStack gap="3">
            <Text>{review.user}</Text>
            <Rating code="modal" length={+review.rating} />
            <Text fontWeight={500}>{`( ${review.label} )`}</Text>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{review.text}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
