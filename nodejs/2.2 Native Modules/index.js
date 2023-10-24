// note: node is not a framework, but a runtime environment

const fs = require("fs")
// this is short for file system

// fs.writeFile("message.txt", "hello from node.js :)", (err) => {
//   if (err) throw err;
//   console.log("the file has been saved")
// });

fs.readFile("message.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});