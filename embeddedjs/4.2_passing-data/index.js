import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs") 
});

app.post("/submit", (req, res) => {
  var letters = req.body["fName"].length; 
  // this refers to recieving the data from html to server
  console.log(`${letters} letters in your f-name`)
  res.render("index.ejs", {numletters: letters});
  // this reffers to sending the data from server to html
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
