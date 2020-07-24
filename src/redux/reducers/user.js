import {SAVE_USER_NAME} from '../actions/types'

function usesrReducer(state = {userName: ''}, action) {
  switch (action.type) {
    case SAVE_USER_NAME:
      return Object.assign({}, state, {
        userName: action.userName,
      })

    default:
      return state
  }
}

export default usesrReducer
