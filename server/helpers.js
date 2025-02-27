const get = require('lodash.get')
const db = require('./db')
const isNil = require('lodash.isnil')
function validateParseInt(value) {
  if (!parseInt(value)) throw 'Query params value invalid'

  return parseInt(value)
}

function hasRequiredBody(body) {
  if (isNil(body.userName)) throw 'Missing required request params userName'
  else if (isNil(body.bookId)) throw 'missing required request params bodyId'
  return body
}

function paginateResponse(data, page, limit) {
  const maxLimit = 3
  let start
  let end
  if (limit > maxLimit) {
    start = (page - 1) * maxLimit
    end = start + maxLimit
  } else {
    start = (page - 1) * limit
    end = start + limit
  }
  const result = data.slice(start, end)
  return result
}

function getTotalPage(data, limit) {
  const pageTotal = Math.ceil(data.length / limit)
  return pageTotal
}

function constructLinks(request, limit, page, pageTotal) {
  const baseUrl = 'http://localhost:8080'
  const pathname = get(request, '_parsedOriginalUrl.pathname')
  const path = get(request, '_parsedOriginalUrl.path')
  const nextPage = page + 1
  const prevPage = page - 1

  const next =
    page === pageTotal
      ? {}
      : {next: `${pathname}?limit=${limit}&page=${nextPage}`}

  const prev =
    page === 1 ? {} : {prev: `${pathname}?limit=${limit}&page=${prevPage}`}

  const _links = {
    baseUrl,
    ...prev,
    ...next,
    self: `${baseUrl}${path}`,
  }

  return _links
}

function processQueryByTitle(titleQuery) {
  const matchedBooks = searchBookByTitle(titleQuery)
  return matchedBooks
}

function formatBookStructure(book) {
  const {title, id, author, quantity} = book
  return {id, title, author, quantity}
}

function searchBookByTitle(searchVal) {
  // search feature for title should be case-insensitive
  const searchQuery = searchVal.toLowerCase()
  return db.filter((book) => book.title.toLowerCase().includes(searchQuery))
}

module.exports = {
  validateParseInt,
  hasRequiredBody,
  paginateResponse,
  constructLinks,
  processQueryByTitle,
  formatBookStructure,
  searchBookByTitle,
  getTotalPage,
}
