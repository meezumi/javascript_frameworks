// documentations:
// https://nodejs.org/docs/latest-v18.x/api/fs.html#fswritefilefile-data-options-callback

// https://www.npmjs.com/package/qr-image

// https://www.npmjs.com/package/inquirer

//1. Use the inquirer npm package to get user input.

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "enter the url to generate QR code image:",
      // this is a js object
      name: "URL",
    },
  ])
    //2. Use the qr-image npm package to turn the user entered URL into a QR code image.
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qr_image.png"));

    fs.writeFile("URLs.txt", url, (err) => {
      if (err) throw err;
      console.log("the file has been saved.");
    }); 

  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });









