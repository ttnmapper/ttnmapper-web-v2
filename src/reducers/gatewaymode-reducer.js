import { combineReducers } from 'redux'
import { gatewayModeConstants } from '../constants'



/*
 * Maintains a variable indicating the mode type
*/
function specialMode(state, action) {
  if (typeof state == 'undefined') {
    return gatewayModeConstants.SPECIAL_MODE_NORMAL
  }

  switch (action.type) {
    case gatewayModeConstants.ACTIVATE_SPECIAL_MODE:
      return action.payload.newMode
    default:
      return state;
  }
}

const specialModeList = combineReducers({
  listOfGW: listOfGW,
  otherGateways: otherGateways
})

function listOfGW(state, action) {
  if (typeof state == 'undefined') {
    return []
  }

  return state
}

function otherGateways(state, action) {
  if (typeof state == 'undefined') {
    return true
  }

  return state
}

/**
 * Controls the state for individual gateway and gateway packet moden 
 */
const gatewayMode = combineReducers({
  specialMode: specialMode,
  specialModeList: specialModeList,
})
export default gatewayMode;