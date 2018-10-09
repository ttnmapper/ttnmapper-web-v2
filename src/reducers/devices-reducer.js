import {combineReducers} from 'redux'
import { USER_LOGGED_OUT, REQUEST_DEVICES, RECEIVE_DEVICES, RECEIVE_DEVICES_FAILED } from '../constants'

const defaultDevicesGeneral = {last_updated: null, state: "none"}

function devicesGeneral(state, action) {
  // Return correct state
	if (typeof state == 'undefined') {
		return defaultDevicesGeneral
	}

  switch (action.type) {
    case USER_LOGGED_OUT:
      // Clear the data!
      return defaultDevicesGeneral;
    case REQUEST_DEVICES:
      return Object.assign({}, state, {
        state: "loading"
      })
    case RECEIVE_DEVICES:
      return Object.assign({}, state, {
        state: "data",
        last_update: "now"
      })
    case RECEIVE_DEVICES_FAILED:
      return Object.assign({}, state, {
        state: "error"
      })
  }
  return state
}

function devicesData(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DEVICES:
      return Object.assign({}, state, action.data)
  }
  return state
}

export const devices = combineReducers({
	details: devicesData,
	general: devicesGeneral
})
