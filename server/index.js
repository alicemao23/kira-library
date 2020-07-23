const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

const get = require("lodash.get");
const BOOK_DATA = require("./data.json");

let db = BOOK_DATA.map((book) => {
  book.reservedList = [];
  return book;
});

//TODO: View books currently reserved

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../", "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "build/", "index.html"));
});

function validateQuery(req, res, next) {
  try {
    req.query.page = req.query.page ? validateParseInt(req.query.page) : 1;
    req.query.limit = req.query.limit ? validateParseInt(req.query.limit) : 3;
    next();
  } catch (err) {
    res.status(400).send({ message: err });
  }
}

function validateParseInt(value) {
  if (!parseInt(value)) throw "Query params value invalid";

  return parseInt(value);
}

app.get("/books", validateQuery, (req, res) => {
  try {
    const data = db;
    const limit = get(req, "query.limit", 3);
    const page = get(req, "query.page", 1);
    const titleQuery = get(req, "query.title", false);
    const books = titleQuery ? processQueryByTitle(req.query.title) : data;
    const result = paginateResponse(books, page, limit).map(
      formatBookStructure
    );
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

app.put("/books", validateRequest, (req, res) => {
  const bookID = req.body.bookId;
  const book = db.find((book) => book.id === bookID);
  const userName = req.body.userName;
  const hasAvailability = book.quantity >= 1;

  if (!book || !hasAvailability) {
    res.status(400).send({
      message: "your requested reservation could not be made, please try again",
    });
  }
  db = db.map((book) => {
    if (book.id === parseInt(bookID)) {
      book.quantity = book.quantity - 1;
      book.reservedList.push(userName);
    }
    return book;
  });
  return res.send("success");
});

app.get("/books/:userName", (req, res) => {
  const userName = req.params.userName;
  const result = db.filter((book) => book.reservedList.includes(userName));
  const formatResults = result.map(formatBookStructure);
  return res.send(formatResults);
});

function validateRequest(req, res, next) {
  try {
    const body = hasRequiredBody(req.body);
    req.body.bookId = validateParseInt(body.bookId);
    next();
  } catch (err) {
    res.status(400).send({ message: err });
  }
}

function hasRequiredBody(body) {
  if (body.userName === undefined)
    throw "Missing required request params userName";
  else if (body.bookId === undefined)
    throw "missing required request params bodyId";
  return body;
}

function paginateResponse(data, page, limit) {
  const maxLimit = 3;
  let start;
  let end;
  if (limit > maxLimit) {
    start = (page - 1) * maxLimit;
    end = start + maxLimit;
  } else {
    start = (page - 1) * limit;
    end = start + limit;
  }
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

function processQueryByTitle(titleQuery) {
  const matchedBooks = searchBookByTitle(titleQuery);
  return matchedBooks;
}

function formatBookStructure(book) {
  const { title, id, author, quantity } = book;
  return { id, title, author, quantity };
}

function searchBookByTitle(searchVal) {
  // search feature for title should be case-insensitive
  const searchQuery = searchVal.toLowerCase();
  return BOOK_DATA.filter((book) =>
    book.title.toLowerCase().includes(searchQuery)
  );
}
app.listen(8080, console.log("Server running on port 8080"));
