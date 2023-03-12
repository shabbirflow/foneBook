import React from "react";
import { Card } from "@mui/material";
import { CardActions, CardContent } from "@mui/material";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { contactActions } from "../store/store";
import user from "/images/user.png";
// import css

const Button = styled.button`
  width: 200px;
  height: 50px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #ed50f1;
  color: white;
  transition: 0.1s;
  &:hover {
    scale: 1.1;
    color: yellow;
  }
  @media only screen and (max-width: 1000px) {
    width: 100px;
    height: 40px;
    margin-bottom: 10px;
    padding: 0 10px;
  }
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  @media only screen and (max-width: 1000px) {
    width: 50px;
    height: 50px;
  }
`;
const H2 = styled.h2`
  @media only screen and (max-width: 1000px) {
    margin: 0;
    padding: 0;
  }
`;
const SingleContact = (props) => {
  const dispatch = useDispatch();

  const handleView = () => {
    dispatch(contactActions.showSingle(props));
  };

  return (
    <Card className="animate__animated animate__fadeInDownBig singlecard">
      <CardContent className="content">
        <Img src={user} />
        <H2>{props.name}</H2>
      </CardContent>
      <CardActions className="actions">
        <Button onClick={handleView}> Show Details </Button>
      </CardActions>
    </Card>
  );
};

export default SingleContact;
