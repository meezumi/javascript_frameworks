import express from "express";
import bodyParser from "body-parser";
import pg from "pg"

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Animesh123",
  port: 5432,
});

db.connect()

// db.query("SELECT * FROM visited_countries", (err, res)=> {
//   if (err) {
//     console.error("error executing query", err.stack);
//   } else {
//     vis_count = res.rows;
//   }
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  // to iterate through all of the rows in result we use .rows.forEach()
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  console.log(result.rows);
  console.log(countries);
  res.render("index.ejs", {
    countries: countries, total: countries.length
  });
});

app.post("/add", async (req, res) => {
   const input = req.body.country;
   console.log(input)
  // now we have to check if this country is present in our database, so we make a query
  const result = await db.query("SELECT country_code FROM countries WHERE country_name = $1", [input]);

  if (result.rows.length !== 0){
    const data = result.rows[0];
    console.log(data);
    const countryCode = data.country_code;

    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [countryCode,
    ]);
    res.redirect("/");
  }
 
})

// .split() -> here we are recieving an array of strings, and we are splitting them by the ','

// if we have to insert data in the sql table for here then we use: 
// db.query("INSERT INTO world_food(country, rice_production, wheat_production) VALUES ($1, $2, $3)", ["Italy", 1.46, 1.73]);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
