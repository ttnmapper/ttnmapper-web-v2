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


function listOfGW(state, action) {
  if (typeof state == 'undefined') {
    return []
  }
  
  switch (action.type) {
    case gatewayModeConstants.SMGW_ADD_NEW:
      // Create new GW item, and add it
      return [ ...state, action.payload.gwid]
    case gatewayModeConstants.SMGW_REMOVE:
      return [...state.slice(0, action.payload.index), ...state.slice(action.payload.index + 1)];
    default:
      return state;
  }
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
  specialModeList: combineReducers({
    listOfGW: listOfGW,
    otherGateways: otherGateways
  }),
})
export default gatewayMode;