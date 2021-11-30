import { React, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavBar from "./NavBar";
import SocialCard from "./SocialCard";
import PostModal from "./PostModal";
import "../app.css";

function Feed(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid className="p-0 bg-light text-dark">
      <NavBar
        handleShow={handleShow}
        refresh={props.refresh}
        workerURL={props.workerURL}
      />
      <PostModal
        workerURL={props.workerURL}
        handleClose={handleClose}
        show={show}
      />
      <Row className={"m-3 g-3"}>
        {props.posts.map((post, index) => {
          return (
            <Col key={index} lg>
              <SocialCard
                replacePosts={props.replacePosts}
                feedNum={index}
                workerURL={props.workerURL}
                post={post}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Feed;
