import express from "express";

const app = express();
const port = 3000;

function logger(req, res, next) {
  console.log("Request method: ", req.method);
  console.log("Request URL: ", req.url);
  next(); // REALLY IMPORTANT 
}

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


// // deploy your own middleware:
// app.use((req, res, next) => {
//   console.log("request method: ", req.method);
//   next();
// });

// // the next() method is gonna take it to the next middleware, if there is one present