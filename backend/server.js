const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database("db.sqlite");

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

// Insert sample data if empty
const count = db.prepare("SELECT COUNT(*) as count FROM products").get();

if (count.count === 0) {
  const insert = db.prepare(
    "INSERT INTO products (name, price, image, category) VALUES (?, ?, ?, ?)"
  );

  insert.run("iPhone", 80000, "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9", "electronics");
  insert.run("Laptop", 60000, "https://images.unsplash.com/photo-1517336714731-489689fd1ca8", "electronics");
  insert.run("T-Shirt", 500, "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", "clothing");
  insert.run("Jeans", 1500, "https://images.unsplash.com/photo-1514996937319-344454492b37", "clothing");
}

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/products", (req, res) => {
  const products = db.prepare("SELECT * FROM products").all();
  res.json(products);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));