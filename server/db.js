const BOOK_DATA = require('./data.json')

// Generally its not best practice to have the data structure in a variable, and allow direct mutations. This should normally be a db instantiation
// so db access can be consumed by api end points. Since no db set up is required for the assignment, this variable is sufficient to be used to satisfy
// assigment feature constraints
let db = BOOK_DATA.map((book) => {
  book.reservedList = []
  return book
})

module.exports = db
