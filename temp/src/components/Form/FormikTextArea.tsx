import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { Field, FieldProps, FormikProps } from 'formik';

interface FormikTextAreaProps {
  name: string;
  label: string;
}

const FormikTextArea = ({ name, label }: FormikTextAreaProps) => {
  return (
    <Field name={name}>
      {/* @ts-ignore */}
      {({ field, form }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Textarea {...field} id={name} placeholder={name} />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default FormikTextArea;
