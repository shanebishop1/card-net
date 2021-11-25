import axios from "axios";

export default async function loadPosts(setTopPosts, setLoaded) {
  axios.get("http://localhost:3333/posts").then(
      response => {
          topPosts = response.data.posts;
      }, error =>{
          console.log(error);
      }
  )
}
