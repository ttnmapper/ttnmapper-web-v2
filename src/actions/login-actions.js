import { loginConstants } from '../constants'

import { push } from 'react-router-redux';


/**
 * Send the code to the gateway so that the access tokens can be granted
 */
export function sendCodeToBackend(code) {
  return {
    type: loginConstants.SEND_CODE_TO_BACKEND,
    payload: {
      code: code
    }
  }
}

/** When the user returns to the website, send the code to the back-end to verify the user
 *
 * @param mAccessToken
 */
export function verifyExistingToken(mAccessToken) {
  return {
    type: loginConstants.RETURNING_LOGIN_USER,
    payload: {
      token: mAccessToken
    }
  }
}

export function logout(location) {
  return {
    type: loginConstants.LOG_OUT_REQUESTED,
    payload: {
      previousLocation: location
    }
  }
}
