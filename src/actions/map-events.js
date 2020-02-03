import { push } from 'react-router-redux';
import qs from 'query-string';

import { UPDATE_MAP_POSITION, mapConstants } from '../constants'

/**
 * Dispatch events to update the lat, long and zoom in the state and the url bar
 * 
 * @param {Object} newPosition  Should contain lat, long and zoom parameters
 * @param {Object} queryString  The original query string
*/
export function updateMapPosition(newPosition, queryString) {
  let partsOfStr = queryString.substring(1).split('&');
  let parsedParams = {}

  for (let ind in partsOfStr) {
    //Split into name and value
    let assignment = partsOfStr[ind].split('=')
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
 * 
 * @param {Object} mapExtent
 * @param {Object} dataToFetch
 */
export function fetchNewMapData(mapExtent, zoomLevel, coverageType, knownDetails, knownCoverage) {
  return {
    type: mapConstants.REQUEST_MAP_GATEWAYS,
    payload: {
      mapExtent: mapExtent,
      zoomLevel: zoomLevel,
      coverageType: coverageType, 
      knownDetails: knownDetails,
      knownCoverage: knownCoverage,
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

export function updateMapLayer(newLayer) {
  return {
    type: mapConstants.CHANGE_MAP_LAYER,
    payload: {
      newLayer: newLayer
    }
  }
}

export function updateGwCoverage(newCoverage) {
  return {
    type: mapConstants.CHANGE_MAP_COVERAGE,
    payload: {
      newCoverage: newCoverage
    }
  }
}

/*
// KW - Deprecate multiple single
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
*/

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
