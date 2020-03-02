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
export function addSMGWClicked(selectedGwID, newValue) {
  return {
    type: gatewayModeConstants.SMGW_ADD_CLICKED,
    payload: {
      index: parseInt(selectedGwID),
      newValue: newValue,
    }
  }
}

/**
 *  Dispatched when the user blicks the 'check' button in the UI
 * @param {*} selectedGwID 
 * @param {*} newValue 
 */
export function verifySMGWClicked(selectedGwID, newValue) {
  return {
    type: gatewayModeConstants.SMGW_VERIFY_CLICKED,
    payload: {
      index: parseInt(selectedGwID),
      newValue: newValue
    }
  }
}

/**
 *  Dispatched when the user blicks the '-' button in the UI
 * @param {*} selectedGwID 
 * @param {*} newValue 
 */
export function removeSMGWClicked(selectedGwID, newValue) {
  return {
    type: gatewayModeConstants.SMGW_REMOVE_CLICKED,
    payload: {
      index: parseInt(selectedGwID),
      newValue: newValue
    }
  }
}