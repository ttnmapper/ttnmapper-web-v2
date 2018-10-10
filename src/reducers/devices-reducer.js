import {combineReducers} from 'redux'
import { loginConstants, dataConstants } from '../constants'

const defaultDevicesGeneral = {last_updated: null, state: "none"}

function devicesGeneral(state, action) {
  // Return correct state
	if (typeof state == 'undefined') {
		return defaultDevicesGeneral
	}

  switch (action.type) {
    case loginConstants.USER_LOGGED_OUT:
      // Clear the data!
      return defaultDevicesGeneral;
    case dataConstants.REQUEST_DEVICES:
      return Object.assign({}, state, {
        state: "loading"
      })
    case dataConstants.RECEIVE_DEVICES:
      return Object.assign({}, state, {
        state: "data",
        last_update: "now"
      })
    case dataConstants.RECEIVE_DEVICES_FAILED:
      return Object.assign({}, state, {
        state: "error"
      })
  }
  return state
}

function devicesData(state = {}, action) {
  if (typeof state == 'undefined') {
		return {}
  }

  switch (action.type) {
    case dataConstants.RECEIVE_DEVICES:

      return Object.assign({}, state, action.payload.devices)
  }
  return state
}

export const devices = combineReducers({
	details: devicesData,
	general: devicesGeneral
})
