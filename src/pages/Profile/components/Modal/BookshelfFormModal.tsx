import { useState } from 'react';
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
import FrormikSelect from 'src/components/Form/FrormikSelect';
import { ICreateBookshelf, IOption, Visibility } from 'src/shared/interfaces';
import * as Yup from 'yup';
import * as API from 'src/api';

interface IProps {
  isOpen: boolean;
  initialFormValues: ICreateBookshelf;
  initialSelectedBooks?: IOption[];
  onClose: () => void;
  submitHandler: (values: ICreateBookshelf) => Promise<void>;
}

let timeoutId: NodeJS.Timeout;

const CreateBookshelfSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  visible: Yup.mixed<Visibility>()
    .oneOf([Visibility.PRIVATE, Visibility.PUBLIC])
    .required('Required'),
  books: Yup.array().of(Yup.string<string>()).nullable('a'),
});

export default function BookshelfFormModal(props: IProps) {
  const {
    isOpen,
    initialFormValues,
    initialSelectedBooks,
    onClose,
    submitHandler,
  } = props;

  const [options, setOptions] = useState<IOption[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<IOption[]>(
    initialSelectedBooks ?? []
  );

  const fetchBooks = async (title: string) => {
    const queryString = new URLSearchParams({
      title,
    }).toString();

    try {
      const { data } = await API.bookAPI.findBooks(queryString);

      const options = data.data.map((book) => ({
        value: book.id,
        label: book.title,
      }));

      setOptions(options);
    } catch (error) {
      console.error(error);
    }
  };

  const inputchangeHandler = (newValue: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      if (newValue.length < 3) return;

      fetchBooks(newValue);
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pt="8">
        <ModalHeader textAlign="center">Bookshelf Form</ModalHeader>
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
            <FrormikSelect
              value={selectedBooks}
              defaultValue={selectedBooks}
              label="Books"
              name="books"
              isMulti={true}
              options={options}
              onInputChange={inputchangeHandler}
              onChange={(values) => {
                setSelectedBooks(values as IOption[]);
              }}
            />
          </FormikContainer>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
