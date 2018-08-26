import { UPDATE_MAP_POSITION } from '../constants'

import { push } from 'react-router-redux';
import qs from 'query-string';

function createMapAction(newPosition) {
  return {
		type: UPDATE_MAP_POSITION,
		newPosition: newPosition
	}
}

export function updateMapPosition(newPosition){
  //This will need changing if we get more arguments
  const searchString = qs.stringify(newPosition);

  // Store the new position in the state
  // Store the new position in the URL
  return dispatch => {
    dispatch(createMapAction(newPosition))
    dispatch(push({search: searchString}))
  }
}
