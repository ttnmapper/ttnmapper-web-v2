import {combineReducers} from 'redux'
import { REQUEST_APPLICATIONS, RECEIVE_APPLICATIONS, RECEIVE_APPLICATIONS_FAILED} from '../constants'

function applicationsDetails(state=[], action) {
	switch (action.type) {
		case RECEIVE_APPLICATIONS: {
			return action.data
		}
		default:
			return state
	}
	return state;
}

function applicationsGeneral(state, action) {
	if (typeof state == 'undefined') {
		return {last_updated: null, state: "none"}
	}

	switch (action.type) {
		case REQUEST_APPLICATIONS:
			return Object.assign({}, state, {
				state: "loading"
			})
		case RECEIVE_APPLICATIONS:
			return Object.assign({}, state, {
				state: "data"
			})
		case RECEIVE_APPLICATIONS_FAILED:
			return Object.assign({}, state, {
				state: "error"
			})
		default:
			return state;
	}

}

export const applications = combineReducers({
	details: applicationsDetails,
	general: applicationsGeneral
})
