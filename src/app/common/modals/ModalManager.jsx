import React from "react";
import { useSelector } from "react-redux";
import LoginForm from "../../../features/auth/LoginForm";
import TestModal from "../../../features/sandBox/TestModal";
import RegisterForm from './../../../features/auth/RegisterForm';

const ModalManager = () => {
  const modalLookup = {
    TestModal,
    LoginForm,
    RegisterForm
  };
  
  const currentModal = useSelector((state) => state.modals);

  let renderedModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderedModal}</span>;
};

export default ModalManager;
