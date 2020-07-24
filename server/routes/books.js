const express = require('express')
const router = express.Router()
const get = require('lodash.get')

const {
  paginateResponse,
  constructLinks,
  processQueryByTitle,
  formatBookStructure,
  getTotalPage,
} = require('../helpers.js')
const {validateQuery, validateRequest} = require('../middleware/validators')

let db = require('../db')

router.get('/', validateQuery, (req, res) => {
  try {
    const data = db
    const limit = get(req, 'query.limit', 3)
    const page = get(req, 'query.page', 1)
    const titleQuery = get(req, 'query.title', false)
    const books = titleQuery ? processQueryByTitle(req.query.title) : data
    const result = paginateResponse(books, page, limit).map(formatBookStructure)
    const pageTotal = getTotalPage(books, limit)
    const _links = constructLinks(req, limit, page, pageTotal)
    const response = {
      result,
      _links,
      pageTotal,
    }
    res.send(response)
  } catch (err) {
    console.error(err)
  }
})

router.put('/', validateRequest, (req, res) => {
  const bookID = req.body.bookId
  const book = db.find((book) => book.id === bookID)
  const userName = req.body.userName
  const hasAvailability = book.quantity >= 1

  if (!book || !hasAvailability) {
    res.status(400).send({
      message: 'your requested reservation could not be made, please try again',
    })
  }
  db = db.map((book) => {
    if (book.id === parseInt(bookID)) {
      book.quantity = book.quantity - 1
      book.reservedList.push(userName)
    }
    return book
  })
  return res.send('success')
})

router.get('/:userName', (req, res) => {
  const userName = req.params.userName
  const result = db.filter((book) => book.reservedList.includes(userName))
  const formatResults = result.map(formatBookStructure)
  return res.send(formatResults)
})

module.exports = router
