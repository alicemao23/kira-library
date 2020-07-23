import {all} from 'redux-saga/effects'

import watchBooks from './books'

function* rootSaga() {
  yield all([watchBooks()])
}

export default rootSaga
