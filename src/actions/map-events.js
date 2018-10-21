import { UPDATE_MAP_POSITION, mapConstants } from '../constants'

import { push } from 'react-router-redux';
import qs from 'query-string';


/**
 * When the map is moved we need to store the new position, and update the url bar.
 * @param {Object} newPosition
*/
export function updateMapPosition(newPosition, queryString) {
  var partsOfStr = queryString.substring(1).split('&');
  let parsedParams = {}

  for (var ind in partsOfStr) {
    //Split into name and value
    var assignment = partsOfStr[ind].split('=')
    if (assignment.length == 2) {
      parsedParams[assignment[0]] = assignment[1]
    }
  }
  //Remove lat, long and zoom from the params
  delete parsedParams.lat;
  delete parsedParams.long;
  delete parsedParams.zoom;

  //This will need changing if we get more arguments, such as mode/selected gateway/layer
  const newSearchString = qs.stringify(newPosition) + '&' + qs.stringify(parsedParams);

  return dispatch => {
    // Store the new position in the state
    dispatch({type: UPDATE_MAP_POSITION, newPosition: newPosition })
    // Store the new position in the URL
    dispatch(push({ search: newSearchString }))
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


/**
 * Set the display mode to only show a single gateway cover
 * @param {*} gatewayID
 * @param {*} mode 'radar', 'colorradar', 'alpha', 'heatmap'
 */
export function setSingleGateway(gatewayID, mode) {
  return {
    type: mapConstants.SET_SINGLE_GATEWAY,
    payload: {
      gatewayID: gatewayID,
      mode: mode
    }
  }
}

export function addSingleGateway(gatewayID, mode) {
  return {
    type: mapConstants.ADD_SINGLE_GATEWAY,
    payload: {
      gatewayID: gatewayID,
      mode: mode
    }
  }
}

export function clearSingleGateway(){
  return {
    type: mapConstants.CLEAR_SINGLE_GATEWAY,

  }
}

/**
 * Fetch the data for a single gateway alpha shape
 * @param {*} gatewayID
 */
export function fetchGatewayAlphaShape(gatewayID) {
  return {
    type: mapConstants.REQUEST_MAP_GW_ALPHA,
    payload: {
      gatewayID: gatewayID
    }
  }
}


export function fetchPacketData(deviceID, fromDate, toDate) {
  return {
    type: mapConstants.REQUEST_PACKETS_DETAILS,
    payload: {
      deviceID: deviceID,
      fromDate: fromDate,
      toDate: toDate
    }
  }
}
