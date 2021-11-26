import axios from "axios";
import { Post } from "../post";

async function loadPosts(
  url,
  recentID,
  cardsToReplace,
  posts,
  setPosts,
  setLoaded
) {
  let newPosts = [...posts];
  let quantity = cardsToReplace.length;

  const dataOut = {
    quantity: quantity.toString(),
    recentID: recentID.toString(),
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
        }
        setPosts(newPosts);
        setLoaded(true);
      },
      (error) => {
        console.log(error);
      }
    );
}

export { loadPosts };
