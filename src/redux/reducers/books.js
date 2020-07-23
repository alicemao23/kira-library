import {GET_BOOKS_SUCCESS} from '../actions/types'

function booksReducer(state = {books: []}, action) {
  switch (action.type) {
    case GET_BOOKS_SUCCESS:
      return Object.assign({}, state, {
        bookList: action.books,
      })
    default:
      return state
  }
}

export default booksReducer
