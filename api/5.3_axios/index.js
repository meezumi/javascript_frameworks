import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

// https://axios-http.com/docs/api_intro

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    console.log(result)
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  // Step 2: Play around with the drop downs and see what gets logged.
  // Use axios to make an API request to the /filter endpoint. Making
  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  try {
    console.log(req.body);
    const type = req.body.type;
    const participants = req.body.participants;
    const response = await axios.get(
    `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
    );
    const answer = response.data;
    console.log(answer);
    res.render("index.ejs", {
      data: answer[Math.floor(Math.random() * answer.length)],
    });
    // Step 3: If you get a 404 error (resource not found) from the API request.
    // Pass an error to the index.ejs to tell the user:
    // "No activities that match your criteria."
  } catch (error){
    console.error("failed to make request", error.message);
    res.render("index.ejs", {
      error: "no activities found for the criteria you selected."
    });
  }
  
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

/*
  axios.get(url, {
    config: {
    }
  });

  axios.post(url, body, {
    config/headers: {

    }
  });

  axios.put(url, body, {
    config/params/headers: {
      // need to provide all the information which you want to be updated.
    }
  });

  axios.patch(url, body, {
    config/params/headers: {
      // any bit of the update that needs to be update.
    }
  });

  axios.delete(url, {
    config: {

    }
  });

*/  