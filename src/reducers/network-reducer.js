import {combineReducers} from 'redux'
import { mapConstants} from '../constants'


function connected(state,action) {
  if (typeof state == 'undefined') {
                return []
  }

  switch(action.type) {
    case mapConstants.RECEIVE_GATEWAY_DETAILS_FAILED:
    case mapConstants.RECEIVE_MAP_GATEWAYS_FAILED:
    case mapConstants.RECEIVE_MAP_GW_ALPHA_FAILED:
    case mapConstants.RECEIVE_MAP_GW_CIRCLES_FAILED:
    case mapConstants.RECEIVE_MAP_GW_RADAR_FAILED:
      return false

  }
  return true
}

export const network = combineReducers({
  connected
})