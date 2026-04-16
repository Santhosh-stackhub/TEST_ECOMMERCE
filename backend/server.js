const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database("db.sqlite");

// CREATE TABLE
db.prepare(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price INTEGER,
    image TEXT,
    category TEXT
  )
`).run();

// SAMPLE DATA (optional)
const insert = db.prepare(`
  INSERT INTO products (name, price, image, category)
  VALUES (?, ?, ?, ?)
`);

const count = db.prepare("SELECT COUNT(*) as count FROM products").get();

if (count.count === 0) {
  insert.run("iPhone", 80000, "https://via.placeholder.com/150", "electronics");
  insert.run("Shoes", 2000, "https://via.placeholder.com/150", "fashion");
}

// API

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/products", (req, res) => {
  const rows = db.prepare("SELECT * FROM products").all();
  res.json(rows);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));