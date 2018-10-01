import { UPDATE_MAP_POSITION, mapConstants } from '../constants'

import { push } from 'react-router-redux';
import qs from 'query-string';


/**
 * When the map is moved we need to store the new position, and update the url bar.
 * @param {Object} newPosition
*/
export function updateMapPosition(newPosition) {
  //This will need changing if we get more arguments, such as mode/selected gateway/layer
  const searchString = qs.stringify(newPosition);

  return dispatch => {
    // Store the new position in the state
    dispatch({type: UPDATE_MAP_POSITION, newPosition: newPosition })
    // Store the new position in the URL
    dispatch(push({ search: searchString }))
  }
}

/**
 * Fetch the data required to draw the current, depending on zoom level
 * mapExtent should contain a bounding box of the current map, and the zoom level
 * @param {Object} mapExtent
 * @param {Object} dataToFetch
 */
export function fetchNewMapData(mapExtent, zoomLevel, knownGateways, knownCircles, knownRadar) {
  return {
    type: mapConstants.REQUEST_MAP_GATEWAYS,
    payload: {
      mapExtent: mapExtent,
      zoomLevel: zoomLevel,
      knownGateways: knownGateways,
      knownCircles: knownCircles,
      knownRadar: knownRadar
    }
  }
}
