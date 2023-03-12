import styled from "@emotion/styled";
import icon1 from "/images/icon1.png";
import add from "/images/add.png";
import { useDispatch } from "react-redux";
import { contactActions } from "../store/store";
import "animate.css";

const Div = styled.div`
  position: absolute;
  top: 0;
  width: 80vw;
  height: 80px;
  background-color: #2f58cd;
  color: white;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 1000px) {
    width: 100vw;
    height: 60px;
  }
`;

const Leftdiv = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  margin: 0 1rem;
  transition: 0.1s;
  &:hover {
    scale: 1.05;
    transform: translateY(5px);
    cursor: pointer;
  }
  @media only screen and (max-width: 1000px) {
    margin: 0 0.5rem;
    scale: 0.8;
  }
`;

const Styledimg = styled.img`
  width: 70px;
  height: 100px;
  /* &:hover {
    transform: translateY(5px);
    cursor: pointer;
  } */
`;

const Button = styled.button`
  margin: 0.5rem 1rem;
  width: 110px;
  height: 60px;
  background-color: yellow;
  border: none;
  border-radius: 1rem;
  transition: 0.1s;
  &:hover {
    scale: 1.05;
    transform: translateY(5px);
    cursor: pointer;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 1000px) {
    width: 80px;
    height: 45px;
    margin-right: 25px;
  }
`;

const Navbar = () => {
  const dispatch = useDispatch();

  const showAddModal = () => {
    dispatch(contactActions.showAddModal());
  };

  return (
    <Div>
      <Leftdiv>
        <Image src={icon1} />
        <h1 className="animate__animated animate__bounce title">foneBook</h1>
      </Leftdiv>

      <Button
        onClick={showAddModal}
        className="animate__animated animate__headShake"
      >
        <Styledimg src={add} />
      </Button>
    </Div>
  );
};

export default Navbar;
