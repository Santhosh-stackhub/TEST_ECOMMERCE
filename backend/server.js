const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./db.sqlite");

// ✅ STEP 1: CREATE TABLE FIRST
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    price INTEGER,
    original_price INTEGER,
    rating REAL,
    image TEXT
  )`);

  // ✅ STEP 2: INSERT DATA AFTER TABLE CREATED
  const products = [
    ["iPhone", "Electronics", 80000, 90000, 4.5, "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"],
    ["Laptop", "Electronics", 60000, 75000, 4.3, "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"],
    ["Headphones", "Electronics", 2000, 3000, 4.2, "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd"],
    ["T-Shirt", "Clothing", 500, 1000, 4.1, "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"],
    ["Jeans", "Clothing", 1500, 2500, 4.0, "https://images.unsplash.com/photo-1541099649105-f69ad21f3246"],
    ["Shoes", "Footwear", 2000, 3500, 4.4, "https://images.unsplash.com/photo-1542291026-7eec264c27ff"]
  ];

  db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
    if (row.count === 0) {
      products.forEach(p => {
        db.run(
          "INSERT INTO products (name, category, price, original_price, rating, image) VALUES (?, ?, ?, ?, ?, ?)",
          p
        );
      });
    }
  });
});

// ✅ STEP 3: API
app.get("/products", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// ✅ STEP 4: SERVER
app.listen(5000, () => {
  console.log("Backend running on 5000");
});