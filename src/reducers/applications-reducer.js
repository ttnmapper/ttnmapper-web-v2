import {combineReducers} from 'redux'
import { loginConstants, dataConstants} from '../constants'

export function applicationsDetails(state=[], action) {
	switch (action.type) {
		case dataConstants.RECEIVE_APPLICATIONS: {
			return action.payload
		}
		default:
			return state
	}
	return state;
}

export function applicationsGeneral(state, action) {
	if (typeof state == 'undefined') {
		return {last_updated: null, state: "none"}
	}

	switch (action.type) {
		case dataConstants.REQUEST_APPLICATIONS:
			return Object.assign({}, state, {
				state: "loading"
			})
		case dataConstants.RECEIVE_APPLICATIONS:
			return Object.assign({}, state, {
				state: "data"
			})
		case dataConstants.RECEIVE_APPLICATIONS_FAILED:
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
