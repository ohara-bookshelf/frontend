import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';

interface FormikTextAreaProps {
  name: string;
  label: string;
}

const FormikTextArea = ({ name, label }: FormikTextAreaProps) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <FormControl isInvalid={form.touched[name] && !!form.errors[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Textarea {...field} id={name} placeholder={name} />
          {form.errors[name] &&
            form.touched[name] &&
            typeof form.errors[name] === 'string' && (
              <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
            )}
        </FormControl>
      )}
    </Field>
  );
};

export default FormikTextArea;
