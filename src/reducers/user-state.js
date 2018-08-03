import {combineReducers} from 'redux'
import { USER_LOGGED_IN, USER_LOGGED_OUT} from '../constants'

export function userState(state, action) {
	if (state in window) {
		return { 'loggedIn' : false}
	}
	if (action.type === USER_LOGGED_IN) {
		return Object.assign({}, state, { 'loggedIn' : true})
	}
	else if (action.type === USER_LOGGED_OUT) {
		return Object.assign({}, state, { 'loggedIn' : false})
	}
	else {
		return state
	}
}
