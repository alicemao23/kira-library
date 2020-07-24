import {put, takeEvery} from 'redux-saga/effects'
import isNil from 'lodash.isnil'
import {api} from '../utils'

import {
  GET_BOOKS,
  GET_BOOKS_SUCCESS,
  RESERVE_BOOK,
  RESERVE_BOOK_SUCCESS,
  SEARCH_BOOKS,
  GET_RESERVED_BOOKS,
  GET_RESERVED_BOOKS_SUCCESS,
} from '../actions/types'

export function* getBooks({url}) {
  try {
    const apiUrl = isNil(url) ? '/books' : url
    const response = yield api({url: apiUrl, method: 'GET'})
    const books = response.data
    yield put({type: GET_BOOKS_SUCCESS, books})
  } catch (err) {
    console.error(err)
  }
}

export function* getBookByTitle({query}) {
  const title = encodeURI(query)
  try {
    const response = yield api({
      url: `/books?title=${title}`,
      method: 'GET',
    })
    const books = response.data
    yield put({type: GET_BOOKS_SUCCESS, books})
  } catch (err) {
    console.error(err)
  }
}

export function* reserveBook({userName, bookId}) {
  try {
    const option = {
      data: {userName, bookId},
    }
    yield api({url: '/books', method: 'PUT', option})
    yield put({type: RESERVE_BOOK_SUCCESS})
    yield put({type: GET_RESERVED_BOOKS, userName})
  } catch (err) {
    console.error(err)
  }
}
export function* getReserveBooks({userName}) {
  try {
    const response = yield api({url: `/books/${userName}`, method: 'GET'})
    const books = response.data
    yield put({type: GET_RESERVED_BOOKS_SUCCESS, books})
  } catch (err) {
    console.error(err)
  }
}

export function* watchBooks() {
  yield takeEvery(GET_BOOKS, getBooks)
  yield takeEvery(SEARCH_BOOKS, getBookByTitle)
  yield takeEvery(RESERVE_BOOK, reserveBook)
  yield takeEvery(GET_RESERVED_BOOKS, getReserveBooks)
}

export default watchBooks
