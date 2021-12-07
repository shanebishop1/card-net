import { React, useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { loadPosts, refreshAll } from "./api/loadPosts";
import { Post } from "./util/post";
import Feed from "./components/Feed";
import "./app.css";

function App() {
  const WORKER_URL = "https://card-net.shane-b.workers.dev";
  // const WORKER_URL = "http://127.0.0.1:8787";

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
