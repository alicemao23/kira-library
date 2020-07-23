const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

const books = require("./routes/books");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../", "build")));

app.use("/books", books);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "build/", "index.html"));
});

app.listen(8080, console.log("Server running on port 8080"));
