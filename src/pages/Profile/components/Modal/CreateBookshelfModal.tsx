import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import FormikContainer from 'src/components/Form/FormikContainer';
import FormikInput from 'src/components/Form/FormikInput';
import FormikRadio from 'src/components/Form/FormikRadio';
import FormikTextArea from 'src/components/Form/FormikTextArea';
import * as Yup from 'yup';

interface IProps {
  isOpen: boolean;
  initialFormValues: unknown;
  onClose: () => void;
  submitHandler: (values: unknown) => void;
}

const CreateBookshelfSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  visible: Yup.mixed().oneOf(['PRIVATE', 'PUBLIC']).required('Required'),
});

const CreateBookshelfModal = (props: IProps) => {
  const { isOpen, onClose, initialFormValues, submitHandler } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pt="8">
        <ModalHeader textAlign="center">Create Bookshelf</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormikContainer
            initialValues={initialFormValues}
            validationSchema={CreateBookshelfSchema}
            submitHandler={submitHandler}
          >
            <FormikInput label="Bookshelf Name" name="name" />
            <FormikTextArea label="Description" name="description" />
            <FormikRadio
              name="visible"
              label="Visibility"
              values={['PUBLIC', 'PRIVATE']}
              options={['Public', 'Private']}
              defaultValue="PUBLIC"
            />
          </FormikContainer>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default CreateBookshelfModal;
