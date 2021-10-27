import {
  React,
  useCallback,
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import NavBar from "./components/NavBar";
import SocialCard from "./components/SocialCard";

function App() {
  return (
    <Container fluid className="p-0 bg-light text-dark">
      <NavBar />

      <Row className={"m-3 g-3"}>
        <Col lg>
          <SocialCard />
        </Col>
        <Col lg>
          <SocialCard />
        </Col>
        <Col lg>
          <SocialCard />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
