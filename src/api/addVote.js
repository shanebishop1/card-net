import axios from "axios";

export default async function addVote(url, postID, voteType) {
  const dataOut = { id: postID, voteType: voteType };
  axios
    .post(url, dataOut, {
      headers: {
        "Content-Type": "application/json",
        "Cn-action": "addVote",
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
