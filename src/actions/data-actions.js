import {dataConstants} from '../constants'



export function fetchApplications() {
  return {
    type: dataConstants.REQUEST_APPLICATIONS,
  }
}


export function fetchDevices(appID) {
  return {
    type: dataConstants.REQUEST_DEVICES,
    payload: {
      "appID": appID
    }
  }
}
