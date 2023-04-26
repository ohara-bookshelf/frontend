import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Field } from 'formik';
import { HTMLInputTypeAttribute } from 'react';

interface IProps {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
}

function FormikInput(props: IProps) {
  const { name, label, type = 'text' } = props;
  return (
    <Field name={name}>
      {/* @ts-ignore */}
      {({ field, form }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Input {...field} id={name} type={type} placeholder={name} />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}

export default FormikInput;
