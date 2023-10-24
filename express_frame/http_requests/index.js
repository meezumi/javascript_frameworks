// HTTP Requests:

// GET: request a resource from a server
// POST: sending a resource to the server (sign up page)
// PUT: replace a resource (get a new bicycle for a broken wheel one)
// PATCH: patch up a resource (get a new wheel for that broken wheel bicycle)
// DELETE: deletes the resouces, request from client to the server 

import express from "express";

const app = express();
const port = 3000

app.get("/", (req, res) => {
  // "/" is the root/homepage endpoint
  // console.log(req.rawHeaders)
  res.send("<h1>hello neice and nephew</h1>")
})

app.get("/about", (req, res) => {
  res.send("<h1>about me:</h1> <p>i'm an asshole</p>")
})

app.get("/contact", (req, res) => {
  res.send("phone no: 909as-if6178")
})

app.listen(port, () => {
  console.log("server is running at port 3000")
})

// nodemon automatically restarts the server after save changes are made.
// so we use nodemon index.js


// HTTP Responces:

// 100-199 Informational Responces : hold on 
// 200-299 Successfull Responces : here you go 
// 300-399 Redirection Responces : go away
// 400-499 Client error Responses : you screwed up 
// 500-599 Server error Responses : i screwed up 

