import { gatewayModeConstants } from '../constants'

export function changeGatewayMode(newMode) {
  return {
    type: gatewayModeConstants.ACTIVATE_SPECIAL_MODE,
    payload: {
      newMode: newMode
    }
  }
}

/**
 *  Dispatched when the user blicks the '+' button in the UI
 * @param {*} selectedGwID 
 * @param {*} newValue 
 */
export function addSMGW(gwid) {
  return {
    type: gatewayModeConstants.SMGW_ADD,
    payload: {gwid: gwid }
  }
}

/**
 *  Dispatched when the user blicks the '-' button in the UI
 * @param {*} selectedGwID 
 * @param {*} newValue 
 */
export function removeSMGW(index) {
  return {
    type: gatewayModeConstants.SMGW_REMOVE,
    payload: {index:index}
  }
}