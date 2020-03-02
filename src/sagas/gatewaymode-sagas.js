/*
This file contains all sagas that fetch data for map data, such as visible gateways,
gateway positions and coverage maps.
*/
import { call, put, takeLatest, takeEvery} from 'redux-saga/effects'
import { gatewayModeConstants } from '../constants'
import { push } from 'react-router-redux';


/**
 * When the add button is clicked, add the new item,
 * @param {} action 
 */
function* addSMGW(action) {
    //Dispatch event to add to state
    yield put({
      type: gatewayModeConstants.SMGW_ADD_NEW,
      payload: action.payload
    });

    yield(verifySMGW(action))
}

function* verifySMGW(action) {
    // Call api to verify the gw
    let successful = Math.random() > 0.5;

    if (successful) {
      yield put({
        type: gatewayModeConstants.SMGW_CHANGE_TO_CONFIRMED,
        payload: action.payload
      });
    }
    else {
      yield put({
        type: gatewayModeConstants.SMGW_CHANGE_TO_DENIED,
        payload: action.payload
      });
    }
}


function* removeSMGW(action) {
  yield put({
    type: gatewayModeConstants.SMGW_REMOVE_EXISTING,
    payload: action.payload
  });
}


function* spgwSagas() {
  // Take only the latest one, in cae two move events occur
  yield takeEvery(gatewayModeConstants.SMGW_ADD_CLICKED, addSMGW);
  yield takeEvery(gatewayModeConstants.SMGW_VERIFY_CLICKED, verifySMGW);
  yield takeEvery(gatewayModeConstants.SMGW_REMOVE_CLICKED, removeSMGW);
}

export { spgwSagas };
