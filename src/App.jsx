import Navbar from "./assets/Navbar"
import styled from "@emotion/styled"
import AddContact from "./assets/AddContact"
import { useSelector, useDispatch } from "react-redux"
import ContactsView from "./assets/ContactsView"
import { useEffect } from "react";
import { contactActions } from "./store/store"
import SingleView from "./assets/SingleView"

const Div = styled.div`
width: 80vw;
min-height: 100vh;
display: flex;
align-self: center;
margin: auto;
overflow: auto;
max-height: 500vh;
@media only screen and (max-width: 1000px) {
  width: 100vw;
  }
`

let initial = true;

function App() {

  const dispatch = useDispatch();
  const myContacts = useSelector(state => state.contacts);
  const singleView = useSelector(state => state.singleView);

  useEffect(() => {

    const stuff = localStorage.getItem('contacts');
    let contactStuff = JSON.parse(stuff);
    dispatch(contactActions.setInitial(contactStuff || []));

  }, [])

  useEffect(() => {
    if(initial) {
      initial = false; return;
    }

    localStorage.setItem('contacts', JSON.stringify(myContacts));

  }, [myContacts])

  const openModal = useSelector(state => state.addModal);
  // const contactState = useSelector(state => state);
  return (
    <Div className="App">
      <Navbar />
      {   openModal &&    <AddContact /> }
      <ContactsView />
      
      {singleView && <SingleView/> }
    </Div>
  )
}

export default App
