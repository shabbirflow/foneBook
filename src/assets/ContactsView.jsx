import React from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import SingleContact from './SingleContact'

const Div = styled.div`
  /* background-color: blue; */
  position: absolute;
  top: 80px;
  width: 80vw;
  overflow: auto;
  @media only screen and (max-width: 1000px) {
    width: 100vw;
    top: 60px;
  }
`;
const Ul = styled.ul`
margin: 2rem;
padding: 1rem;
/* background-color: blue; */
display: grid;
grid-template-columns: 1fr 1fr 1fr;
overflow: auto;
height: 80vh;
margin-bottom: 20vh;
@media only screen and (max-width: 1000px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0.5rem;
    padding: 0.5rem;
    height: 90vh;
  }
`;

const ContactsView = () => {
  const contacts = useSelector((state) => state.contacts);

  const elements = contacts.map((x) => {
    return (
        <SingleContact key = {x.id} name = {x.name} contact = {x.contact} id = {x.id} email = {x.email} />
    )
  });

  return (
    <Div>
      <Ul>{elements}</Ul>
    </Div>
  );
};

export default ContactsView;
