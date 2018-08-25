import { UPDATE_MAP_POSITION } from '../constants'

function createMapAction(newPosition) {
  return {
		type: UPDATE_MAP_POSITION,
		newPosition: newPosition
	}
}

export function updateMapPosition(newPosition){
  // Store the new position in the state

  // Store the new position in the local store

  // Store the new position in the URL
  return dispatch => dispatch(createMapAction(newPosition))
}
