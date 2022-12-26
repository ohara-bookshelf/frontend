import React from 'react';
import * as Yup from 'yup';

import FormikContainer from '../../../../components/Form/FormikContainer';
import FormikInput from '../../../../components/Form/FormikInput';
import FormikRadio from '../../../../components/Form/FormikRadio';
import FormikTextArea from '../../../../components/Form/FormikTextArea';

const CreateBookshelfSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Required'),
  visible: Yup.mixed().oneOf(['PRIVATE', 'PUBLIC']).required('Required'),
});

const CreateBookshelfModal = ({ initialFormValues, submitHandler }) => {
  return (
    <FormikContainer
      initialValues={initialFormValues}
      validationSchema={CreateBookshelfSchema}
      submitHandler={submitHandler}
    >
      <FormikInput label="Bookshelf Name" name="name" />
      <FormikTextArea label="Description" name="description" type="te" />
      <FormikRadio
        name="visible"
        label="Visibility"
        values={['PUBLIC', 'PRIVATE']}
        options={['Public', 'Private']}
        defaultValue="PUBLIC"
      />
    </FormikContainer>
  );
};

export default CreateBookshelfModal;
