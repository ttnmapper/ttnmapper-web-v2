import {combineReducers} from 'redux'
import { UPDATE_MAP_POSITION } from '../constants'


export function currentPosition(state, action) {
	if (typeof state == 'undefined') {
    //Demo position for now
		return {lat: -30.34775, long: 23.58459, zoom: 6}
  }

  console.log(action)

	switch (action.type) {
		case UPDATE_MAP_POSITION:
      return action.newPosition;
    default:
      return state;
  }

}

export const mapDetails = combineReducers({
  currentPosition: currentPosition
})
