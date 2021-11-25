import { React } from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavBar from "./components/NavBar";
import SocialCard from "./components/SocialCard";

import "./app.css";

function Feed(props) {
  return (
    <Container fluid className="p-0 bg-light text-dark">
      <NavBar />
      <Row className={"m-3 g-3"}>
        <Col lg>
          <SocialCard post={props.topPosts[0]} />
        </Col>
        <Col lg>
          <SocialCard post={props.topPosts[1]} />
        </Col>
        <Col lg>
          <SocialCard post={props.topPosts[2]} />
        </Col>
      </Row>
    </Container>
  );
}

export default Feed;
