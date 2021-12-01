import axios from "axios";

async function loadPosts(
  url,
  recentID,
  cardsToReplace,
  posts,
  setPosts,
  setLoaded,
  setRecentID
) {
  let newPosts = [...posts];
  let quantity = cardsToReplace.length;

  const dataOut = {
    quantity: quantity.toString(),
    recentID: recentID,
  };
  await axios
    .post(url, dataOut, {
      headers: { "Content-Type": "application/json", "Cn-action": "getPosts" },
    })
    .then(
      (response) => {
        let data = response.data;
        for (let i = 0; i < data.posts.length; i++) {
          if (i >= quantity) break;
          newPosts[cardsToReplace[i]] = JSON.parse(data.posts[i]);
          if (i == data.posts.length - 1)
            setRecentID(newPosts[cardsToReplace[i]].id - 1);
        }
        setPosts(newPosts);
        setLoaded(true);
      },
      (error) => {
        console.log(error);
      }
    );
}

async function refreshAll(WORKER_URL, posts, setPosts, setLoaded, setRecentID) {
  let toUpdate = [];
  for (let i = 0; i < posts.length; i++) {
    toUpdate.push(i);
  }
  loadPosts(WORKER_URL, 0, toUpdate, posts, setPosts, setLoaded, setRecentID);
}

async function refreshByGet(
  WORKER_URL,
  posts,
  setPosts,
  setLoaded,
  setRecentID
) {
  let newPosts = [...posts];
  let quantity = 3;
  await axios.get(WORKER_URL).then(
    (response) => {
      let data = response.data;
      for (let i = 0; i < quantity; i++) {
        newPosts[i] = JSON.parse(data.posts[i]);
        if (i === quantity - 1) setRecentID(newPosts[i].id - 1);
      }
      setPosts(newPosts);
      setLoaded(true);
    },
    (error) => {
      console.log(error);
    }
  );
}

export { loadPosts, refreshAll, refreshByGet };
