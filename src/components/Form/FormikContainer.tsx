import { Button, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

interface IProps<T, U extends Yup.Schema<T>> {
  children: JSX.Element[];
  initialValues: T;
  validationSchema: U;
  submitHandler: (payload: T) => void;
}

export default function FormikContainer<
  T extends object,
  U extends Yup.Schema<T>
>(props: IProps<T, U>) {
  const { children, initialValues, validationSchema, submitHandler } = props;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values: T, actions) => {
        console.log('values');
        submitHandler(values);
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {(formikProps) => (
        <Form>
          <VStack gap={6}>
            {children}
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={formikProps.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
