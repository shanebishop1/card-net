import React, { useState, useEffect, useRef } from "react";
import { Card, Row, Button, Col, Modal, Form } from "react-bootstrap";
import { IconContext } from "react-icons";
import sendPost from "../api/sendPost";
import "../app.scss";
import { Post } from "../util/post";
import "./postmodal.scss";

function PostModal(props) {
  const firstFieldRef = useRef();
  const handleSubmit = (event) => {
    props.handleClose();
    event.preventDefault();
    let newPost = new Post(
      0,
      event.target.elements[0].value,
      event.target.elements[1].value,
      new Date().toString(),
      event.target.elements[2].value,
      0
    );
    sendPost(props.workerURL, newPost);
    console.log(newPost);
  };
  return (
    <Modal
      fullscreen="md-down"
      onShow={() => {
        firstFieldRef.current.focus();
      }}
      show={props.show}
      onHide={props.handleClose}
    >
      <Modal.Header className="post-modal" closeButton>
        <Modal.Title>New Post</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} id="post-modal-body" className="post-modal">
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Post Title</Form.Label>
          <Form.Control ref={firstFieldRef} type="text" placeholder="Title" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPostText">
          <Form.Label>Content</Form.Label>
          <Form.Control placeholder="Content" as="textarea" rows={7} />
        </Form.Group>
        <Modal.Footer className="post-modal">
          <Button type="submit" variant="primary">
            Post
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
export default PostModal;
