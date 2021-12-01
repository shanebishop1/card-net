import axios from "axios";

export default async function sendPost(url, post) {
  const dataOut = JSON.stringify(post);

  axios
    .post(url, dataOut, {
      headers: {
        "Content-Type": "application/json",
        "Cn-action": "postContent",
      },
    })
    .then(
      (response) => {
        console.log("POST RESPONSE: " + JSON.stringify(response.data));
      },
      (error) => {
        console.log(error);
      }
    );
}
