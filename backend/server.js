const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const path = require("path");

process.on("uncaughtException", err => {
  console.error("UNCAUGHT ERROR:", err);
});

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database(path.join(__dirname, "db.sqlite"));

// table
db.prepare(`
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  price INTEGER,
  image TEXT,
  category TEXT
)
`).run();

// insert sample
const count = db.prepare("SELECT COUNT(*) as count FROM products").get();

if (count.count === 0) {
  db.prepare("INSERT INTO products (name, price, image, category) VALUES (?, ?, ?, ?)")
    .run("iPhone", 80000, "https://via.placeholder.com/150", "electronics");
}

// routes
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.get("/products", (req, res) => {
  const rows = db.prepare("SELECT * FROM products").all();
  res.json(rows);
});

const PORT = process.env.PORT || 5000;
console.log("Starting server...");

app.listen(PORT, () => console.log("Server running on", PORT));