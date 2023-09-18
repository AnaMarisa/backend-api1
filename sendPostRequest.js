const axios = require("axios");

const apiUrl = "http://localhost:3000/api/register"; // Update the URL and endpoint
const requestData = {
  username: "anamarisa",
  password: "anamarisa",
};

axios
  .post(apiUrl, requestData)
  .then((response) => {
    console.log("Response:", response.data);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
