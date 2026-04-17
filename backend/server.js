const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database(path.join(__dirname, "db.sqlite"));

// CREATE TABLE
db.prepare(`
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  price INTEGER,
  image TEXT,
  category TEXT
)
`).run();

// FORCE INSERT DATA (IMPORTANT)
db.prepare("DELETE FROM products").run();

const insert = db.prepare(
  "INSERT INTO products (name, price, image, category) VALUES (?, ?, ?, ?)"
);

insert.run("iPhone", 80000, "https://via.placeholder.com/150", "electronics");
insert.run("Laptop", 60000, "https://via.placeholder.com/150", "electronics");
insert.run("T-Shirt", 500, "https://via.placeholder.com/150", "clothing");
insert.run("Shoes", 2000, "https://via.placeholder.com/150", "footwear");

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// PRODUCTS ROUTE (THIS WAS MISSING ❌)
app.get("/products", (req, res) => {
  const products = db.prepare("SELECT * FROM products").all();
  res.json(products);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));