/*
This file contains all sagas that fetch data for map data, such as visible gateways,
gateway positions and coverage maps.
*/
import { call, put, takeLatest, takeEvery} from 'redux-saga/effects'
import { loginConstants } from '../constants'

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

    yield put({
      type: loginConstants.RECEIVE_TOKENS,
      payload:  json
    });
  } catch (e) {
    yield put({
      type: loginConstants.RECEIVE_TOKENS_FAILURE,
      message: e.message,
      payload: {
      }
    });
  }
}



function* loginSagas() {
  // Take only the latest one, in cae two move events occur
  yield takeEvery(loginConstants.SEND_CODE_TO_BACKEND, postCodetoServer);
}

export { loginSagas };
