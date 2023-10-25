import express, { json } from "express"
import axios from "axios"
import bodyParser from "body-parser";

// https://axios-http.com/docs/post_example

const apiKey = "bcf0b1bcbc7297b7d475d30542bd1bba";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public")); 

app.get("/", (req, res) => {
  // console.log(result.data)
  res.render("index.ejs", {
    temperature: "enter the latitude and longitude of the location:"
  });
});

app.post("/search", async (req, res) => {
  const lati = req.body.latitude;
  const long = req.body.longitude;
  const result = await axios.get(
    "http://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        lat: lati,
        lon: long,
        appid: apiKey,
        units: "metric"
      },
    }
  );
  res.render("index.ejs", {
    temperature: JSON.stringify(result.data.main.temp)
  })
})

app.listen(port, () => {
  console.log("server running at port 3000");
});
