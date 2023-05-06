import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';

interface IProps {
  name: string;
  label: string;
  defaultValue?: string;
  values: string[];
  options: string[];
}

function FormikRadio(props: IProps) {
  const { name, label, values, options } = props;
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <FormControl
          id={name}
          isInvalid={!!form.errors[name] && !!form.touched[name]}
        >
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <RadioGroup {...field} id={name} {...props}>
            <HStack spacing={6}>
              {values.map((value, i) => (
                <Radio {...field} value={value} key={i}>
                  {options[i]}
                </Radio>
              ))}
            </HStack>
          </RadioGroup>
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

export default FormikRadio;
