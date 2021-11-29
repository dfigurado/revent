import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Button, Divider, Label } from "semantic-ui-react";
import * as Yup from "yup";
import { closeModal } from "../../app/common/modals/modalReducer";
import TextInput from "./../../app/common/form/TextInput";
import ModalWrapper from "./../../app/common/modals/ModalWrapper";
import { registerInFirebase } from "./../../app/firestore/firebaseService";
import SocialLogin from "./SocialLogin";

const RegisterForm = () => {
  const dispatch = useDispatch();

  return (
    <ModalWrapper size='mini' header='Register Re-events'>
      <Formik
        initialValues={{ displayName: "", email: "", password: "" }}
        validationSchema={Yup.object({
          displayName: Yup.string().required(),
          email: Yup.string().required().email(),
          password: Yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await registerInFirebase(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setErrors({ auth: "Incorrect username or password" });
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, errors }) => (
          <Form className='ui form'>
            <TextInput name='displayName' placeholder='Display Name' />
            <TextInput name='email' placeholder='Email Address' />
            <TextInput name='password' placeholder='Password' type='password' />
            {errors.auth && (
              <Label
                basic
                color='red'
                style={{ marginBottom: 10 }}
                content={errors.auth}
              />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              fluid
              size='large'
              color='teal'
              content='Register'
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default RegisterForm;
