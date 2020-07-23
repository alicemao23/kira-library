import {put, takeEvery} from 'redux-saga/effects'

import {api} from '../utils'

import {
  GET_BOOKS,
  GET_BOOKS_SUCCESS,
  RESERVE_BOOK,
  RESERVE_BOOK_SUCCESS,
  SEARCH_BOOKS,
} from '../actions/types'

export function* getBooks() {
  try {
    const response = yield api({url: '/books', method: 'GET'})
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
  } catch (err) {
    console.error(err)
  }
}

export function* watchBooks() {
  yield takeEvery(GET_BOOKS, getBooks)
  yield takeEvery(SEARCH_BOOKS, getBookByTitle)
  yield takeEvery(RESERVE_BOOK, reserveBook)
}

export default watchBooks
