import { getApplication, getDevices } from './api-calls'
import { REQUEST_APPLICATIONS, RECEIVE_APPLICATIONS, RECEIVE_APPLICATIONS_FAILED, REQUEST_DEVICES, RECEIVE_DEVICES} from '../constants'

// Update all the devices of a specific app
export function requestApplications(){
	return {
		type: REQUEST_APPLICATIONS,
		data: {}
	}
}

// Invalidate the devices undera specific app
export function receiveApplications(listOfApplications){
	return {
		type: RECEIVE_APPLICATIONS,
		data: listOfApplications
	}
}

export function receiveApplicationsFailed(error_message){
	console.log(error_message)
	return {
		type: RECEIVE_APPLICATIONS_FAILED,
		data: {}
	}
}

export function fetchApplications(dispatch) {
		// Tell state we are requesting new data, show a spinner or something
		dispatch(requestApplications())

    // And fetch the data!
		fetch(getApplication())
    .then(response => response.json() )
    .then((json) => {
      //Receive the applications into the state
      dispatch(receiveApplications(json))

      json.map((application)=> {
        // fetchApplicationdevices(application.app_id)
        console.log(application.app_id)
        dispatch(fetchApplicationdevices(application.app_id))
      })
    })
		.catch(error => dispatch(receiveApplicationsFailed(error)))
}

function requestDevices(app_id) {
	return {
		type: REQUEST_DEVICES,
		data: {"app_id": app_id}
	}
}

function receiveDevices(listOfDevices) {
  // Convert the received list to a better format
  let devices = {}
  listOfDevices.map((device, index) => {
    devices[device.devices.dev_id] = device;
  })

	return {
		type: RECEIVE_DEVICES,
		data: devices
	}
}

export function receiveDevicesFailed(error){
  console.log("Receive devices failed")
}

export function fetchApplicationdevices(app_id) {
	return dispatch => {
		dispatch(requestDevices(app_id))

		return fetch(getDevices(app_id))
		.then(response => response.json())
		.then(json => dispatch(receiveDevices(json)))
	}
}
