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

function selectedGW(state, action) {
  if (typeof state == 'undefined') {
    return {gwState: gatewayModeConstants.GW_NEW}
  }  


  switch (action.type) {
    case gatewayModeConstants.SMGW_ADD_NEW:
      return {gwState: gatewayModeConstants.SMGW_VERIFYING, gwID:action.payload.newValue}

    case gatewayModeConstants.SMGW_CHANGE_TO_VERIFYING:
      return {gwState: gatewayModeConstants.SMGW_VERIFYING, gwID:action.payload.newValue}

    case gatewayModeConstants.SMGW_CHANGE_TO_CONFIRMED:
      return {gwState: gatewayModeConstants.SMGW_ACCEPTED, gwID:action.payload.newValue}

    case gatewayModeConstants.SMGW_CHANGE_TO_DENIED:
      return {gwState: gatewayModeConstants.SMGW_DENIED, gwID:action.payload.newValue}
      
    case gatewayModeConstants.SMGW_CHANGE_TO_EDITING:
      return {gwState: gatewayModeConstants.SMGW_EDITING, gwID:action.payload.newValue}
  }
}

function listOfGW(state, action) {
  if (typeof state == 'undefined') {
    return []
  }
  
  switch (action.type) {
    case gatewayModeConstants.SMGW_ADD_NEW:
      // Create new GW item, and add it
      return [ ...state, selectedGW({}, action)]
    case gatewayModeConstants.SMGW_REMOVE_EXISTING:
      return [...state.slice(0, action.payload.index), ...state.slice(action.payload.index + 1)];
    
    // apply reducer to child elements
    case gatewayModeConstants.SMGW_CHANGE_TO_VERIFYING: 
    case gatewayModeConstants.SMGW_CHANGE_TO_CONFIRMED: 
    case gatewayModeConstants.SMGW_CHANGE_TO_DENIED:
    case gatewayModeConstants.SMGW_CHANGE_TO_EDITING:
      if (typeof action.payload.index !== 'undefined') {
        return state.map((item, index ) => {
          if (index !== action.payload.index) {
            return item
          }
          return selectedGW(item, action)
        });
      }
      return state;
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
  specialModeList: specialModeList,
})
export default gatewayMode;