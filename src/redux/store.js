import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import rootSaga from './sagas'

const defaultState = {
  books: {
    bookList: [],
  },
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(sagaMiddleware)

const store = createStore(reducer, defaultState, composeEnhancers(middleware))
sagaMiddleware.run(rootSaga)

export default store
