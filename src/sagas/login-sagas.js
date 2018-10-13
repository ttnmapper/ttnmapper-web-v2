/*
This file contains all sagas that fetch data for map data, such as visible gateways,
gateway positions and coverage maps.
*/
import { call, put, takeLatest, takeEvery} from 'redux-saga/effects'
import { loginConstants } from '../constants'
import { push } from 'react-router-redux';

import * as Api from '../api-calls'

/*
Call the API endpoint to find details about a specific gateway
*/
function* postCodetoServer(action) {
  try {
    const response = yield call(Api.exchangeCodeForToken, action.payload.code);

    const json = yield response.json();

    if ('success' in json && json.success === false) {
      yield put({
        type: loginConstants.RECEIVE_TOKENS_FAILURE,
        message: json.message,
        payload: {
        }
      });
      return
    }

    // Save the tokens
    yield put({
      type: loginConstants.RECEIVE_TOKENS,
      payload: json
    });

    // Tell everyone we're logged in.
    yield put({type: loginConstants.USER_LOGGED_IN});

    // Store the token
    localStorage.setItem('mToken', JSON.stringify(json));
    console.log("User logged in, stored")

    // And redirect to user page
    yield put (push('/user'))

  } catch (e) {
    yield put({
      type: loginConstants.RECEIVE_TOKENS_FAILURE,
      message: e.message,
      payload: {
      }
    });
  }
}

/** When a user returns and has a token in local storage, we verify this with the server
 *
 * @param {*} action
 */
function* returningLoginUser(action){
  try {
    const response = yield call(Api.verifyExistingToken, action.payload.token.access_token);
    const json = yield response.json();

    // If we receive a failure
    if ('loggedIn' in json && json.loggedIn === false) {
      yield put({
        type: loginConstants.RECEIVE_TOKENS_FAILURE,
        message: json.message,
        payload: {
        }
      });
      return
    }

    // If the code is verified
    console.log("Code was verified!")
    yield put({
      type: loginConstants.USER_LOGGED_IN
    });

  } catch (e) {

    console.log("Error:")
    console.log(e)
  }
}

function* logoutUser(action){

  localStorage.removeItem('mToken')

  yield put({
    type: loginConstants.USER_LOGGED_OUT
  });
}


function* loginSagas() {
  // Take only the latest one, in cae two move events occur
  yield takeEvery(loginConstants.SEND_CODE_TO_BACKEND, postCodetoServer);
  yield takeEvery(loginConstants.RETURNING_LOGIN_USER, returningLoginUser);
  yield takeEvery(loginConstants.LOG_OUT_REQUESTED, logoutUser);
}

export { loginSagas };
