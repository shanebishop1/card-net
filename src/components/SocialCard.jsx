import React, { useState, useEffect } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import { IconContext } from "react-icons";
import {
  BsArrowDownSquare,
  BsArrowUpSquare,
  BsSkipForward,
} from "react-icons/bs";

function SocialCard(props) {

  function handleSkip(event){
    
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
        <Card.Header>Name</Card.Header>
        <Card.Body>
          <Card.Title>Title</Card.Title>
          <Card.Text>
            {props.post.content}
          </Card.Text>
          <Row className={"m-0 g-0 p-0"}>
            <Col xs="4">
              <Button className="w-75" variant="danger">
                <BsArrowDownSquare />
              </Button>
            </Col>
            <Col xs="4">
              <Button className="w-75" variant="primary">
                <BsSkipForward />
              </Button>
            </Col>
            <Col xs="4">
              <Button className="w-75" variant="success">
                <BsArrowUpSquare />
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </IconContext.Provider>
  );
}

export default SocialCard;
