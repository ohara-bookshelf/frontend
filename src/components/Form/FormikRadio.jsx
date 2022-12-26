import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';

function FormikRadio({ name, label, values, options, ...props }) {
  return (
    <Field name={name}>
      {({ field, form }) => (
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
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}

export default FormikRadio;
