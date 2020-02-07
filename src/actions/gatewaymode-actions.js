import { gatewayModeConstants } from '../constants'

export function changeGatewayMode(newMode) {
  return {
    type: gatewayModeConstants.ACTIVATE_SPECIAL_MODE,
    payload: {
      newMode: newMode
    }
  }
}