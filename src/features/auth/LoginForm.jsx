import React from "react";
import * as Yup from "yup";
import TextInput from "./../../app/common/form/TextInput";
import ModalWrapper from "./../../app/common/modals/ModalWrapper";
import { Button } from "semantic-ui-react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/common/modals/modalReducer";
import { signInUser } from "./authActions";

const LoginForm = () => {
  const dispatch = useDispatch();

  return (
    <ModalWrapper size='mini' header='Sign in to Re-events'>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().required().email(),
          password: Yup.string().required(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(signInUser(values));
          setSubmitting(false);
          dispatch(closeModal());
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className='ui form'>
            <TextInput name='email' placeholder='Email Address' />
            <TextInput name='password' placeholder='Password' type='password' />
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              fluid
              size='large'
              color='teal'
              content='Login'
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default LoginForm;
