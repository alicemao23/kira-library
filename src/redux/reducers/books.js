import {GET_BOOKS_SUCCESS, GET_RESERVED_BOOKS_SUCCESS} from '../actions/types'

function booksReducer(state = {books: [], reservedBooks: []}, action) {
  switch (action.type) {
    case GET_BOOKS_SUCCESS:
      return Object.assign({}, state, {
        bookList: action.books,
      })

    case GET_RESERVED_BOOKS_SUCCESS:
      return Object.assign({}, state, {
        reservedBooks: action.books,
      })

    default:
      return state
  }
}

export default booksReducer
