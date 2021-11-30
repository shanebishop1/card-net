import React from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import { IconContext } from "react-icons";
import "../app.scss";
import {
  BsArrowDownCircleFill,
  BsArrowUpCircleFill,
} from "react-icons/bs";
import { getPrettyTime } from "../util/utils";
import addVote from "../api/addVote";

function SocialCard(props) {
  async function handleUp(event) {
    addVote(props.workerURL, props.post.id, "up");
    props.replacePosts([props.feedNum]);
  }

  async function handleDown(event) {
    addVote(props.workerURL, props.post.id, "down");
    props.replacePosts([props.feedNum]);
  }

  return (
    <IconContext.Provider
      value={{
        style: { fontSize: "200%" },
        color: "#fffafa",
        className: "colored-svg-icons",
      }}
    >
      <Card bg="secondary">
        <Card.Header>@{props.post.title}</Card.Header>
        <Card.Body>
          <Card.Title>{props.post.author}</Card.Title>
          <Card.Text
            style={{ color: props.post.score > -1 ? "#266941" : "#6d231e" }}
          >
            {props.post.score} point
            {props.post.score < -1 ||
            props.post.score > 1 ||
            props.post.score == 0
              ? "s"
              : ""}
          </Card.Text>
          <Card.Text>{getPrettyTime(props.post.time)}</Card.Text>
          <hr />
          <Card.Text>{props.post.content}</Card.Text>
          <Row className={"m-0 g-0 p-0"}>
            <Col xs="6">
              <Button
                className="w-75"
                variant="danger"
                onClick={(e) => handleDown(e)}
              >
                <BsArrowDownCircleFill />
              </Button>
            </Col>
            <Col xs="6">
              <Button
                className="w-75"
                variant="success"
                onClick={(e) => handleUp(e)}
              >
                <BsArrowUpCircleFill />
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </IconContext.Provider>
  );
}

export default SocialCard;
