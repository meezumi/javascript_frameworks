import express from "express";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

import bodyParser from "body-parser"

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// or we could create a function for bandnamegenerator
function bandNameGenerator(req, res, next){
  console.log(req.body)
  bandName = req.body["street"] + req.body["pet"];
  next();
}
// then call the function using 
// app.use(bandNameGenerator)

app.post("/submit", (req, res) => {
  res.send(`<h1>your band name is:</h1> <h2>${req.body["street"]+req.body["pet"]}</h2>`)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
