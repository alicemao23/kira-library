import {GET_BOOKS, RESERVE_BOOK, SAVE_USER_NAME, SEARCH_BOOKS} from './types'

const getBooks = () => {
  return {
    type: GET_BOOKS,
  }
}

const reserveBook = ({userName, bookId}) => {
  return {
    type: RESERVE_BOOK,
    userName,
    bookId,
  }
}

const saveUserName = () => {
  return {
    type: SAVE_USER_NAME,
  }
}
const searchBookByTitle = (queryString) => {
  return {
    type: SEARCH_BOOKS,
    query: queryString,
  }
}
export {getBooks, reserveBook, saveUserName, searchBookByTitle}
