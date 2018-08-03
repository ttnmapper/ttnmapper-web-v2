import { getApplication } from './api-calls'
import { REQUEST_APPLICATIONS, RECEIVE_APPLICATIONS, RECEIVE_APPLICATIONS_FAILED, REQUEST_DEVICES} from '../constants'

// Update all the devices of a specific app
export function requestApplications(){
	return {
		type: REQUEST_APPLICATIONS,
		data: {}
	}
}

// Invalidate the devices undera specific app
export function receiveApplications(device_details){
	return {
		type: RECEIVE_APPLICATIONS,
		data: device_details
	}
}

export function receiveApplicationsFailed(error_message){
	console.log(error_message)
	return {
		type: RECEIVE_APPLICATIONS_FAILED,
		data: {}
	}
}

export function fetchApplications() {
	return dispatch => {
		// Tell state we are requesting new data, show a spinner or something
		dispatch(requestApplications())

		return fetch(getApplication())
		.then(response => response.json())
		.then(json => dispatch(receiveApplications(json)))
		.catch(error => dispatch(receiveApplicationsFailed(error)))
	}
}



export function requestDevices(app_id) {
	return {
		type: REQUEST_DEVICES,
		data: {"app_id": app_id}
	}
}

export function receiveDevices(app_id) {
	return {
		type: RECEIVE_DEVICES,
		data: {"app_id": app_id}
	}
}

export function receiveDevicesFailed(error){

}

export function fetchApplicationdevices(app_id) {
	return dispatch => {
		dispath(requestDevices(app_id))

		return fetch(getDevices(app_id))
		.then(response => response.json())
		.then(json => dispatch(receiveDevices(json)))
	}
}