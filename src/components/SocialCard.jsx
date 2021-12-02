import React from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import { IconContext } from "react-icons";
import "../app.scss";
import { BsHandThumbsDownFill, BsHandThumbsUpFill } from "react-icons/bs";
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
      <Card style={{ height: "70vh", maxHeight: "70vh" }} bg="secondary">
        <Card.Header>
          <Card.Title>
            <strong>{props.post.title}</strong>
          </Card.Title>
          <Card.Text>
            <span style={{ color: "#161c3f" }}>
              {" "}
              @{props.post.username} <br />
              <span style={{ color: "#141916" }}>
                {" "}
                {getPrettyTime(props.post.time)}
              </span>
              <br />
              <span
                style={{ color: props.post.score > -1 ? "#266941" : "#6d231e" }}
              >
                {" "}
                {props.post.score} point
                {props.post.score < -1 ||
                props.post.score > 1 ||
                props.post.score == 0
                  ? "s"
                  : ""}
              </span>
            </span>
          </Card.Text>
        </Card.Header>
        <Card.Body
          style={{ height: "80%", maxHeight: "80%" }}
          className="overflow-auto"
        >
          <Card.Text>{props.post.content}</Card.Text>
          <div
            style={{ textAlign: "center", maxHeight: "100%", maxWidth: "100%" }}
          >
            {props.post.hasOwnProperty("image") && (
              <img
                style={{ maxHeight: "100%", maxWidth: "100%", borderRadius:"5%" }}
                src={props.post.image}
              />
            )}
          </div>
        </Card.Body>
        <Card.Footer>
          <Row className={"m-0 g-0 p-0"}>
            <Col className="pe-3" xs="6">
              <Button
                className="w-100"
                variant="danger"
                onClick={(e) => handleDown(e)}
              >
                <BsHandThumbsDownFill />
              </Button>
            </Col>
            <Col className="ps-3" xs="6">
              <Button
                className="w-100"
                variant="success"
                onClick={(e) => handleUp(e)}
              >
                <BsHandThumbsUpFill />
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </IconContext.Provider>
  );
}

export default SocialCard;
