const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database(path.join(__dirname, "db.sqlite"));

// Create table
db.prepare(`
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  price INTEGER,
  image TEXT,
  category TEXT
)
`).run();

// CLEAR + INSERT DATA (force fix)
db.prepare("DELETE FROM products").run();

const insert = db.prepare(
  "INSERT INTO products (name, price, image, category) VALUES (?, ?, ?, ?)"
);

insert.run("iPhone", 80000, "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9", "electronics");
insert.run("Laptop", 60000, "https://images.unsplash.com/photo-1517336714731-489689fd1ca8", "electronics");
insert.run("T-Shirt", 500, "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", "clothing");
insert.run("Jeans", 1500, "https://images.unsplash.com/photo-1514996937319-344454492b37", "clothing");

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

// PRODUCTS ROUTE
app.get("/products", (req, res) => {
  try {
    const data = db.prepare("SELECT * FROM products").all();
    console.log("Sending products:", data);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching products");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));