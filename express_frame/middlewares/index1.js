import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import bodyParser from "body-parser";

// to figure out the file path dynamically (automatically) we have to use this module,
// since when we publish over website to the cloud, it won't be same as
// when it was in local server.

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req, res) => {
  // console.log(__dirname + "/public/index.html");
  res.sendFile(__dirname + "/public/index.html");
  // we are sending an entire file (index.html) to the server root address
});

app.post("/submit", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


// middlewares can handle 4 types of functionalities: 
// 1. logging (logger) ex. ex. morgan
// 2. pre-processing ex. body-parser
// 3. authentication ex. 
// 4. error handling ex.
