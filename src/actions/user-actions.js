import {USER_LOGGED_IN, USER_LOGGED_OUT} from '../constants'

export const logoutUser = text => ({
	type: USER_LOGGED_OUT,
	payload: {}
})

export const loginUser = text => ({
	type: USER_LOGGED_IN,
	payload: {}
})