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
import ReactLoading from "react-loading";
import SocialCard from "./components/SocialCard";
import loadPosts from "./api/loadPosts";
import { Post } from "./post";
import Feed from "./Feed";
import "./app.css";

function App() {
  const [topPosts, setTopPosts] = useState([
    new Post(),
    new Post(),
    new Post(),
  ]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadPosts(setTopPosts, setLoaded);
  }, []);

  useEffect(() => {
    console.log(topPosts);
  }, [topPosts]);

  return (
    <div className="app">
      {!loaded ? (
        <ReactLoading
          type={"spinningBubbles"}
          color={"#141916"}
          height={"14%"}
          width={"14%"}
          className="loading"
        />
      ) : (
        <Feed topPosts={topPosts} />
      )}
    </div>
  );
}

export default App;
