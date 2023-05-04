import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
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
      {({ field, form }: FieldProps) => (
        <FormControl isInvalid={form.touched[name] && !!form.errors[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Input {...field} id={name} type={type} placeholder={name} />
          {form.errors[name] &&
            form.touched[name] &&
            typeof form.errors[name] === 'string' && (
              <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
            )}
        </FormControl>
      )}
    </Field>
  );
}

export default FormikInput;
