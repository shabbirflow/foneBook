import { Modal, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { contactActions } from "../store/store";
import styled from "@emotion/styled";
import React, { useRef, useState } from "react";
import user from "/images/settings.png";

const Form = styled.form`
  /* width: 500px; */
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  gap: 15px;
  @media only screen and (max-width: 1000px) {
    margin: 0 10px;
    height: 40vh;
    width: 70vw;
    overflow: auto;
    /* align-self: center;
    justify-self: center; */
  }
`;

const Button = styled.button`
  padding: 25px;
  border-radius: 5px;
  border: none;
  font-family: "Karla", sans-serif;
  font-size: 15px;
  background-color: #ed50f1;
  width: 200px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.1s;
  margin-bottom: 0;
  &:hover {
    scale: 1.1;
    color: yellow;
  }
  @media only screen and (max-width: 1000px) {
    width: 28vw;
    margin: 5px 0;
  }
`;

const DeleteButton = styled.button`
  padding: 25px;
  border-radius: 5px;
  border: none;
  font-family: "Karla", sans-serif;
  font-size: 15px;
  background-color: red;
  width: 200px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.1s;
  margin-bottom: 0;
  &:hover {
    scale: 1.1;
    color: yellow;
  }
  @media only screen and (max-width: 1000px) {
    width: 28vw;
    margin: 5px 0;
  }
`;

const Input = styled.input`
  padding: 20px;
  border-radius: 5px;
  border: none;
  font-family: "Karla", sans-serif;
  font-size: 15px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 1px;
  padding: 0;
`;

const Span = styled.span`
  display: flex;
  justify-content: space-between;
`;

const H1 = styled.h1`
  display: inline-block;
`;

const H3 = styled.h2`
  display: inline-block;
  color: green;
`;

const BtnDiv = styled.div`
  display: flex;
  justify-content: space-between;
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
  return val.trim().includes("@");
};

const Img = styled.img`
  width: 120px;
  height: 120px;
  margin: 0.5rem auto;

  @media only screen and (max-width: 1000px) {
    width: 80px;
    height: 80px;
  }
`;

const SingleView = (props) => {
  const singleView = useSelector((state) => state.singleView);
  const current = useSelector((state) => state.inSingleView);
  const contactRef = useRef();
  const nameRef = useRef();
  const [nameValid, setNameValid] = useState(true);
  const [contactValid, setContactValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const emailRef = useRef();
  const [confirmDelete, setConfirmDelete] = useState(false);

  // console.log(ccurrent)

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(contactActions.hideSingle());
  };

  const handleAdd = (event) => {
    event.preventDefault();

    const nowName = nameRef.current.value;
    const nowContact = contactRef.current.value;
    const nowEmail = emailRef.current.value;

    !nameCheck(nowName) ? setNameValid(false) : setNameValid(true);
    !contactCheck(nowContact) ? setContactValid(false) : setContactValid(true);
    !emailCheck(nowEmail) ? setEmailValid(false) : setEmailValid(true);

    let formValid =
      nameCheck(nowName) && contactCheck(nowContact) && emailCheck(nowEmail);

    if (!formValid) return;

    dispatch(
      contactActions.update({
        id: current.id,
        name: nowName,
        contact: nowContact,
        email: nowEmail,
      })
    );

    dispatch(contactActions.hideSingle());
  };

  const handleDelete = (event) => {
    event.preventDefault();
    setConfirmDelete(true);
  };

  const finalDelete = (event) => {
    dispatch(contactActions.deleteContact(current.id));
    dispatch(contactActions.hideSingle());
    console.log('lol')
  };

  const stuff = (
    <React.Fragment>
      <Img src={user} />
      <Span>
        <H1>{current.name}</H1>
        <H3>{current.contact}</H3>{" "}
      </Span>
      <Form>
        <Input
          type="text"
          id="contactinput"
          defaultValue={current.name}
          ref={nameRef}
        />
        {!nameValid && (
          <ErrorMessage> Name has to be 3 or more letters. </ErrorMessage>
        )}
        <Input
          type="number"
          id="contactinput"
          ref={contactRef}
          defaultValue={current.contact}
        />
        {!contactValid && (
          <ErrorMessage>Contact number has to be 10 digits</ErrorMessage>
        )}
        <Input
          type="email"
          id="emailinput"
          defaultValue={current.email}
          ref={emailRef}
        />
        {!emailValid && <ErrorMessage> Email must contain '@' </ErrorMessage>}
        <BtnDiv>
          <Button onClick={handleAdd}> Update </Button>
          <DeleteButton onClick={handleDelete}> Delete </DeleteButton>
        </BtnDiv>
      </Form>
    </React.Fragment>
  );

  return (
    <Modal
      open={singleView}
      onClose={handleClose}
      className="animate__animated animate__fadeInDownBig"
    >
      <Box className="box">
        {!confirmDelete && stuff}
        {confirmDelete && (
          <React.Fragment>
            <h2>Are you sure about deleting this contact? </h2>
            <BtnDiv>
              <DeleteButton onClick={finalDelete}>Delete</DeleteButton>
              <Button onClick={() => {dispatch(contactActions.hideSingle())}} >
                Cancel
              </Button>
            </BtnDiv>
          </React.Fragment>
        )}
      </Box>
    </Modal>
  );
};

export default SingleView;
