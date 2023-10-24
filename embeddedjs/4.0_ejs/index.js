import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const today = new Date();
  const day = today.getDay();
  // const day = 0;
  // console.log(day);
  let type = "a weekday";
  let adv = "time to put in the work boiis";

  if (day == 0 || day == 6) {
    type = "the weekend";
    adv = "you like boiiss, nuahhh";
  }

  let bowl = ["apple", "orange", "grape"];
  res.render("index.ejs", {
  dayType: type, 
  advice: adv,
  fruit: bowl
  });
});

app.listen(port, () => {
  console.log("server running port: 3000")
});

// EJS Tags:
// <%= variable %> javascript with an output
// <% console.log("hello") %> any javascript executable code (wont give any output on html)
// <%- <h1>Hellow</h> %> rederer html code
// <%%  %> to show <% or %> on the html, telling the viewer about using ej
// <%#  %> this is a comment
// <%- include("anotherfile.ejs") %> insert another ejs file, it maybe a header or footer file that remains the same.