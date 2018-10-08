import {combineReducers} from 'redux'
import { loginConstants} from '../constants'

function tokens(state, action) {
  if (typeof state == 'undefined') {
    return { 'mToken': "" }
  }

  switch (action.type) {
    case loginConstants.RECEIVE_TOKENS:
      return  { 'mToken': action.payload.mToken }
    case loginConstants.RECEIVE_TOKENS_FAILURE:
      return { 'mToken': "" }
    case loginConstants.LOGOUT:
      return { 'mToken': "" }
    default:
      return state
  }
}

function loggedIn(state, action) {
	if (typeof state == 'undefined') {
    return false
  }

	switch (action.type) {
    case loginConstants.RECEIVE_TOKENS:
      return true
    case loginConstants.RECEIVE_TOKENS_FAILURE:
      return false
    case loginConstants.LOGOUT:
      return true
    default:
      return state
  }

}


export const userState = combineReducers({
  loggedIn: loggedIn,
  tokens: tokens,
  userName: 'Tony'
})
