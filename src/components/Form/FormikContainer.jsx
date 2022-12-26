import { Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';

const FormikContainer = ({
  children,
  initialValues,
  validationSchema,
  submitHandler,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        submitHandler(values);
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {(props) => (
        <Form>
          {children}

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikContainer;
