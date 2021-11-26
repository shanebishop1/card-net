import { React } from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavBar from "./components/NavBar";
import SocialCard from "./components/SocialCard";

import "./app.css";

function Feed(props) {
  return (
    <Container fluid className="p-0 bg-light text-dark">
      <NavBar workerUrl={props.workerUrl}/>
      <Row className={"m-3 g-3"}>
        <Col lg>
          <SocialCard workerURL={props.workerURL} post={props.posts[0]} />
        </Col>
        <Col lg>
          <SocialCard workerURL={props.workerURL} post={props.posts[1]} />
        </Col>
        <Col lg>
          <SocialCard workerURL={props.workerURL} post={props.posts[2]} />
        </Col>
      </Row>
    </Container>
  );
}

export default Feed;
