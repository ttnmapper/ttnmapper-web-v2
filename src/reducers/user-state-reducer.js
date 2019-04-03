import {combineReducers} from 'redux'
import { loginConstants} from '../constants'

function tokens(state, action) {
  if (typeof state == 'undefined') {
    const mTokens = localStorage.getItem('mToken')

    if (mTokens !== null) {
      return JSON.parse(mTokens)
    }
    else {
      return { 'mToken': "" }
    }
  }

  switch (action.type) {
    case loginConstants.RECEIVE_LOGIN_TICKET:
    return { 'loginTicket': action.payload}
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
    // First run!
    const mTokens = localStorage.getItem('mToken')

    if (mTokens !== null) {
      // We have a token
      return loginConstants.CheckingToken
    }
    else {
      return loginConstants.LoggedOut
    }
  }

	switch (action.type) {
    case loginConstants.USER_LOGGED_IN:
      return loginConstants.LoggedIn

    case loginConstants.RECEIVE_TOKENS_FAILURE:
      return loginConstants.LoggedOut

    case loginConstants.USER_LOGGED_OUT:
      return loginConstants.LoggedOut

    default:
      return state
  }

}

function userName(state, action) {
  return "Test User"
}


export const userState = combineReducers({
  loggedIn: loggedIn,
  tokens: tokens,
  userName: userName
})
