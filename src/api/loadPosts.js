import axios from "axios";
import { Post } from "../post";

export default async function loadPosts(setTopPosts, setLoaded) {
  // axios.get("http://localhost:3333/posts").then(
  //     response => {
  //         topPosts = response.data.posts;
  //     }, error =>{
  //         console.log(error);
  //     }
  // )
  const ps = await fetch("http://localhost:3333/posts")
    .then((response) => response.json())
    .then((data) => {
      let topPosts = [];
      topPosts.push(new Post(0, "one", "me", "now", data[0]));
      topPosts.push(new Post(1, "two", "you", "now", data[1]));
      topPosts.push(new Post(2, "three", "them", "now", data[2]));
      setTopPosts(topPosts);
      setLoaded(true);
    });
  // one extra step
}
