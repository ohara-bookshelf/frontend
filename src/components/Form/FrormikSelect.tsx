import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { Field, FieldProps } from 'formik';
import { IFieldInputProps } from 'src/shared/interfaces';

type Option = {
  label: string;
  value: string;
};

interface IProps extends IFieldInputProps {
  options: Option[];
  isMulti?: boolean;
  defaultValue?: Option | Option[];
  value?: Option | Option[];
  onInputChange: (newValue: string) => void;
  onChange: (newValue: Option | Option[]) => void;
}

export default function FrormikSelect(props: IProps) {
  const {
    name,
    label,
    isMulti = false,
    options,
    defaultValue,
    onInputChange,
    onChange,
    ...rest
  } = props;

  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <FormControl isInvalid={form.touched[name] && !!form.errors[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Select
            {...field}
            {...rest}
            id={name}
            name={name}
            placeholder={label}
            options={options}
            defaultValue={defaultValue}
            isMulti={isMulti}
            onInputChange={onInputChange}
            onChange={(newValue) => {
              if (isMulti) {
                form.setFieldValue(
                  name,
                  (newValue as Option[]).map((option) => option.value)
                );
              } else {
                form.setFieldValue(name, (newValue as Option).value);
              }

              onChange(newValue);
            }}
            onBlur={() => form.setFieldTouched(name, true)}
          />
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
