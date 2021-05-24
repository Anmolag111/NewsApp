import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const ErrorModal = (props) => {
  return (
    <Modal isOpen={props.openErrorModal} toggle={props.toggle} color="danger">
      <ModalHeader toggle={props.toggle}>
        {" "}
        {props.element.article.title}
      </ModalHeader>
      <ModalBody>{props.element.article.text}</ModalBody>
    </Modal>
  );
};

export default ErrorModal;
