///IMPORTS
const handleFetch = require("./utils/fetchData");

const express = require("express");
const path = require("path");

require("dotenv").config();

//SETUP
const pathToDist = path.join(__dirname, "../giphy-search/dist");
const serveStatic = express.static(pathToDist);
const app = express();

//console.log(process.env.API_KEY);

const fetchController = async (req, res, nxt) => {
  const API_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=25&offset=0&rating=g&bundle=messaging_non_clips`;
  const [data, error] = await handleFetch(API_URL);
  if (error) {
    console.log(error.message);
    return res.status(404).send(error);
  }
  res.send(data);
};

app.use(serveStatic);
app.get("/api/gifs", fetchController);

const port = 8080;
app.listen(port, () =>
  console.log(`Server is now runnin on http://localhost:${port}`)
);
