import { Navbar, Button } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsArrowClockwise, BsPlusCircleFill } from "react-icons/bs";
import sendPost from "../api/sendPost";
import { Post } from "../util/post";

const NavBar = (props) => {
  async function handlePlusClick() {
    props.handleShow();
  }

  async function handleRefresh() {
    props.refresh();
  }
  return (
    <IconContext.Provider
      value={{
        style: { fontSize: "200%" },
        color: "#141916",
        className: "colored-svg-icons",
      }}
    >
      <Navbar bg="dark" sticky="top" variant="dark">
        <Navbar.Brand
          style={{
            marginRight: "auto",
            marginLeft: "2%",
            fontSize: "200%",
            color: "#C9B6A1",
          }}
        >
          CardNet
        </Navbar.Brand>
        <Button
          variant="light"
          style={{
            marginLeft: "auto",
            marginRight: "2%",
          }}
          onClick={handleRefresh}
        >
          <BsArrowClockwise />
        </Button>
        <Button
          variant="light"
          style={{
            marginLeft: "0%",
            marginRight: "2%",
          }}
          onClick={handlePlusClick}
        >
          <BsPlusCircleFill />
        </Button>
      </Navbar>
    </IconContext.Provider>
  );
};

export default NavBar;
