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
import { loadPosts } from "./api/loadPosts";
import { Post } from "./post";
import Feed from "./Feed";
import "./app.css";

function App() {

// dev:   http://127.0.0.1:8787
// prod:  https://card-net.shane-b.workers.dev
  const WORKER_URL = "https://card-net.shane-b.workers.dev";

  const [posts, setPosts] = useState([
    new Post(),
    new Post(),
    new Post(),
  ]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadPosts(WORKER_URL, 0, [0,1,2], posts, setPosts, setLoaded);
  }, []);

  useEffect(() => {
    console.log("Posts Updated:");
    console.log(posts);
  }, [posts]);

  return (
    <div className="app">
      {
        !loaded ? (
          <ReactLoading
            type={"spinningBubbles"}
            color={"#141916"}
            height={"14%"}
            width={"14%"}
            className="loading"
          />
        ) : (
          <Feed workerUrl={WORKER_URL} posts={posts} />
        )
      }
    </div>
  );
}

export default App;
