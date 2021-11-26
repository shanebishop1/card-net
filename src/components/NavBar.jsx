import { Navbar, Button } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsPlusCircleFill } from "react-icons/bs";
import sendPost from "../api/sendPost";
import { Post } from "../post";

const NavBar = (props) => {
  async function handlePostClick() {
    let post1 = new Post(
      "0",
      "post",
      "me",
      "now",
      "creative stuff"
    );
    sendPost(props.workerUrl, post1);
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
          onClick={handlePostClick}
        >
          <BsPlusCircleFill />
        </Button>
      </Navbar>
    </IconContext.Provider>
  );
};

export default NavBar;
