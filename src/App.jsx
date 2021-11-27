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
import { loadPosts, refreshAll } from "./api/loadPosts";
import { Post } from "./post";
import Feed from "./Feed";
import "./app.css";

function App() {
  const WORKER_URL = "https://card-net.shane-b.workers.dev";
  //const WORKER_URL = "http://127.0.0.1:8787";

  const [posts, setPosts] = useState([new Post(), new Post(), new Post()]);

  const [loaded, setLoaded] = useState(false);
  const [recentID, setRecentID] = useState(0);

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    refreshAll(WORKER_URL, posts, setPosts, setLoaded, setRecentID);
  }

  async function replacePosts(cardsToReplace) {
    loadPosts(
      WORKER_URL,
      recentID,
      cardsToReplace,
      posts,
      setPosts,
      setLoaded,
      setRecentID
    );
  }

  useEffect(() => {
    console.log("Posts Updated:");
    console.log(posts);
  }, [posts]);

  useEffect(() => {
    console.log("RID Updated:");
    console.log(recentID);
  }, [recentID]);

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
        <Feed
          replacePosts={replacePosts}
          refresh={refresh}
          workerURL={WORKER_URL}
          posts={posts}
        />
      )}
    </div>
  );
}

export default App;
