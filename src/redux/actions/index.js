import {
  GET_BOOKS,
  RESERVE_BOOK,
  SAVE_USER_NAME,
  SEARCH_BOOKS,
  GET_RESERVED_BOOKS,
} from './types'

const getBooks = (url) => {
  return {
    type: GET_BOOKS,
    url,
  }
}

const reserveBook = ({userName, bookId}) => {
  return {
    type: RESERVE_BOOK,
    userName,
    bookId,
  }
}

const saveUserName = (userName) => {
  return {
    type: SAVE_USER_NAME,
    userName,
  }
}
const searchBookByTitle = (queryString) => {
  return {
    type: SEARCH_BOOKS,
    query: queryString,
  }
}

const getReservedBooks = (userName) => {
  return {
    type: GET_RESERVED_BOOKS,
    userName,
  }
}
export {
  getBooks,
  reserveBook,
  saveUserName,
  searchBookByTitle,
  getReservedBooks,
}
