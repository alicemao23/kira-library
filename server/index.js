const express = require("express");
const path = require("path");
const app = express();

const BOOK_DATA = require("./data.json");

// Must list all books in inventory (by default)
// Allow searching of books by title
// Allow reservation of books
// View books currently reserved

app.use(express.static(path.join(__dirname, "../", "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "build/", "index.html"));
});

app.listen(8080, console.log("Server running on port 8080"));
