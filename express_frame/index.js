// Node + Express:
// > Readability
// > Less exitCode
// > Middleware

// backend => application + server + database 
// frontend => client

// creating a server:
// 1. create directory
// 2. create index.js 
// 3. initialise npm
// 4. install express package
// 5. write server application in index.js
// 6. start server

import express from "express";
const app = express();
const port = 3000

app.get("/", (req, res) => {
  res.send("Hello niece and nephew")
})

app.listen(port, () => {
  console.log(`server is running at port ${port}`)
})

// netstat -ano | findstr "LISTENING"
// to get a list of local servers running currently
