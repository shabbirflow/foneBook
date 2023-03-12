import React, { useRef, useState } from "react";
import { Box, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { contactActions } from "../store/store";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 600,
//   bgcolor: "background.paper",
//   border: "0.5px solid #000",
//   boxShadow: 24,
//   p: 4,
//   display: "flex",
//   flexDirection: "column",
// };

const Form = styled.form`
  /* width: 500px; */
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  gap: 15px;
  @media only screen and (max-width: 1000px) {
    margin: 0 10px;
    height: 40vh;
    width: 60vw;
    /* background-color: blue; */
    overflow: auto;
    /* align-self: center;
    justify-self: center; */
  }
`;

const Input = styled.input`
  padding: 20px;
  border-radius: 5px;
  border: none;
  font-family: "Karla", sans-serif;
  font-size: 15px;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  @media only screen and (max-width: 1000px) {
    font-size: 25px;
    margin-bottom: 10px;
  }
`;

const Button = styled.button`
  padding: 25px;
  border-radius: 5px;
  border: none;
  font-family: "Karla", sans-serif;
  font-size: 15px;
  background-color: #ed50f1;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    scale: 1.1;
    color: yellow;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 1px;
  padding: 0;
`;

const nameCheck = (val) => {
  return val.trim().length > 3;
};

const contactCheck = (val) => {
  if (val.trim().length === val.length && val.length === 10) {
    return true;
  }
  return false;
};

const emailCheck = (val) => {
  return (val.trim().includes('@'))
}

const AddContact = () => {
  const dispatch = useDispatch();
  const openModal = useSelector((state) => state.addModal);
  const currContacts = useSelector((state) => state.contacts);
  const contactRef = useRef();
  const nameRef = useRef();
  const [nameValid, setNameValid] = useState(true);
  const [contactValid, setContactValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const emailRef = useRef();

  const handleClose = () => {
    dispatch(contactActions.hideAddModal());
    // console.log(contactState)
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const nowName = nameRef.current.value;
    const nowContact = contactRef.current.value;
    const nowEmail = emailRef.current.value;

    !nameCheck(nowName) ? setNameValid(false) : setNameValid(true);
    !contactCheck(nowContact) ? setContactValid(false) : setContactValid(true);
    !emailCheck(nowEmail) ? setEmailValid(false) : setEmailValid(true);

    let formValid = nameCheck(nowName) && contactCheck(nowContact) && emailCheck(nowEmail);

    if (!formValid) return;

    dispatch(
      contactActions.addContact({
        id: uuidv4(),
        name: nowName,
        contact: nowContact,
        email: nowEmail
      })
    );
    // console.log(currContacts);
    handleClose();
  };

  return (
    <Modal open={openModal} onClose={handleClose} className="animate__animated animate__fadeInDownBig">
      <Box  className = 'box' >
        <Title> Enter Contact Details </Title>
        <Form>
          <Input
            type="text"
            id="contactinput"
            placeholder="Enter name"
            ref={nameRef}
          />
          {!nameValid && (
            <ErrorMessage> Name has to be 3 or more letters. </ErrorMessage>
          )}
          <Input
            type="number"
            id="contactinput"
            placeholder="Enter contact number"
            ref={contactRef}
          />
          {!contactValid && (
            <ErrorMessage>Contact number has to be 10 digits</ErrorMessage>
          )}
          <Input
            type="email"
            id="emailinput"
            placeholder="Enter email"
            ref={emailRef}
          />
          {!emailValid && (
            <ErrorMessage> Email must contain '@' </ErrorMessage>
          )}
          <Button onClick={handleAdd}> Add Contact </Button>
        </Form>
      </Box>
    </Modal>
  );
};

export default AddContact;
