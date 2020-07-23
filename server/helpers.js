const get = require("lodash.get");

function validateParseInt(value) {
  if (!parseInt(value)) throw "Query params value invalid";

  return parseInt(value);
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

module.exports = {
  validateParseInt,
  hasRequiredBody,
  paginateResponse,
  constructLinks,
  processQueryByTitle,
  formatBookStructure,
  searchBookByTitle,
};
