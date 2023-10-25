// 1. Import express and axios
import express, { response } from "express"
import axios from "axios"

const app = express();
const port = 3000;
const API = "https://secrets-api.appbrewery.com";

// 3. Use the public folder for static files.
app.use(express.static("public")); 

// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req, res) => {
  // 5. Use axios to get a random secret and pass it to index.ejs to display the
  // secret and the username of the secret.
  try {
    const result = await axios.get(API + "/random");
    res.render("index.ejs", {
      secret: result.data.secret,
      user: result.data.username,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
  console.log(`server running on port: ${port}`)
});