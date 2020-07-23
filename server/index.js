const express = require("express");
const path = require("path");
const app = express();
const get = require("lodash.get");
const BOOK_DATA = require("./data.json");
let db = BOOK_DATA;

// Must list all books in inventory (by default)
// Allow searching of books by title
// Allow reservation of books
// View books currently reserved

app.use(express.static(path.join(__dirname, "../", "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "build/", "index.html"));
});

function validateQuery(req, res, next) {
  try {
    req.query.page = req.query.page ? validateAndParseInt(req.query.page) : 1;
    req.query.limit = req.query.limit
      ? validateAndParseInt(req.query.limit)
      : 3;
    next();
  } catch (err) {
    res.status(403).send({ message: err });
  }
}

function validateAndParseInt(value) {
  if (!parseInt(value)) throw "Query params value invalid";

  return parseInt(value);
}

app.get("/books", validateQuery, (req, res) => {
  try {
    const data = db;
    const limit = get(req, "query.limit", 3);
    const page = get(req, "query.page", 1);
    const result = paginateResponse(data, page, limit);
    const _links = constructLinks(req, limit, page);

    const response = {
      result,
      _links,
    };
    res.send(response);
  } catch (err) {
    console.error(err);
  }
});

function paginateResponse(data, page, limit) {
  const start = (page - 1) * limit;
  const end = start + limit;
  const result = data.slice(start, end);
  return result;
}

function constructLinks(request, limit, page) {
  const baseUrl = "http://localhost:8080";
  const pathname = get(request, "_parsedOriginalUrl.pathname");
  const path = get(request, "_parsedOriginalUrl.path");
  const nextPage = page + 1;
  const prevPage = page - 1;

  const next = {
    next: `${baseUrl}${pathname}?limit=${limit}&page=${nextPage}`,
  };
  const prev =
    page === 1
      ? {}
      : { prev: `${baseUrl}${pathname}?limit=${limit}&page=${prevPage}` };

  const _links = {
    baseUrl,
    ...prev,
    ...next,
    self: `${baseUrl}${path}`,
  };

  return _links;
}

app.listen(8080, console.log("Server running on port 8080"));
