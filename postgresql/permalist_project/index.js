import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import e from "express";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "",
  port: 5432,
});

db.connect();
// this is just temporary data 
let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items ORDER BY id ASC");
    items = result.rows; 
    res.render("index.ejs", {
    listTitle: "to do list",
    listItems: items,
  });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try {
    await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
  // items.push({ title: item });
  res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  const updatedItem = req.body.updatedItemTitle;
  const updatedItemId = req.body.updatedItemId;
  try {
    await db.query("UPDATE items SET title = ($1) WHERE id = ($2)", [updatedItem, updatedItemId]);
    res.redirect("/");
  } catch (err) { 
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  const deleteId = req.body.deleteItemId;
  try {
    await db.query("DELETE FROM items WHERE id = $1", [deleteId]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// upgrades to the to-do list: 
// 1. sort by creation date
// 2. multiple lists (seperate for work, school, projects or anything)
// 3. family members to-do list