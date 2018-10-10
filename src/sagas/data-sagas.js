/*
This file contains all sagas that fetch data for map data, such as visible gateways,
gateway positions and coverage maps.
*/
import { call, put, takeLatest, takeEvery} from 'redux-saga/effects'
import { dataConstants } from '../constants'

import * as Api from '../api-calls'

/*
Call the API endpoint to find details about a specific gateway
*/
function* requestApplications(action) {
  try {
    const response = yield call(Api.getApplication);
    const json = yield response.json();

    yield put({
      type: dataConstants.RECEIVE_APPLICATIONS,
      payload: json.applications
    });

    // For each of the applications, fire off a request
    for (let i = 0; i < json.applications.length; i++) {
      yield put({
        type: dataConstants.REQUEST_DEVICES,
        payload: {
          appID: json.applications[i].app_id
        }
      });
    }

  } catch (e) {
    yield put({
      type: dataConstants.RECEIVE_APPLICATIONS_FAILED,
      message: e.message,
      payload: {
      }
    });
  }
}

function* requestDevices(action) {
    try {
      const response = yield call(Api.getDevices, action.payload.appID);
      const json = yield response.json();

      // The devices are a large list. Convert to a dict with their devID as keys
      let devDict = {}
      for (let i = 0; i < json.devices.length; i++) {
        devDict[json.devices[i].devices["dev_id"]] = json.devices[i]
      }

      yield put({
        type: dataConstants.RECEIVE_DEVICES,
        payload: {
          devices: devDict
        }
      });

    } catch (e) {
      yield put({
        type: dataConstants.RECEIVE_DEVICES_FAILED,
        message: e.message,
        payload: {
        }
      });
    }
  }

function* dataSagas() {
  // Take only the latest one, in cae two move events occur
  yield takeEvery(dataConstants.REQUEST_DEVICES, requestDevices);
  yield takeEvery(dataConstants.REQUEST_APPLICATIONS, requestApplications);
}

export { dataSagas };
