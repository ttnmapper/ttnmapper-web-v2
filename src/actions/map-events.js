import { UPDATE_MAP_POSITION, mapConstants } from '../constants'
import { fetchBoundingBoxUrl, fetchGWDetails } from '../actions/api-calls'
import { batchActions } from 'redux-batched-actions';

import { push } from 'react-router-redux';
import qs from 'query-string';

function createMapAction(newPosition) {
  return {
    type: UPDATE_MAP_POSITION,
    newPosition: newPosition
  }
}

export function updateMapPosition(newPosition) {
  //This will need changing if we get more arguments
  const searchString = qs.stringify(newPosition);

  // Store the new position in the state
  // Store the new position in the URL
  return dispatch => {
    dispatch(createMapAction(newPosition))
    dispatch(push({ search: searchString }))
  }
}

/**
 * Determine what content to show for all the gateways on the map
 * @param {*} zoomLevel
 */
function determineMapRendering(zoomLevel) {

}

function receiveVisibleGateways(newGateways) {
  return {
    type: mapConstants.RECEIVE_MAP_GATEWAYS,
    listOfGateways: newGateways
  }
}

function receiveGWDetails(gatewayID, gatewayDetails) {
  return {
    type: mapConstants.RECEIVE_GATEWAY_DETAILS,
    gatewayID: gatewayID,
    gatewayDetails: gatewayDetails.details
  }
}

/**
 * Fetch the data required to draw the current, depending on zoom level
 * mapExtent should contain a bounding box of the current map, and the zoom level
 * @param {Object} mapExtent
 * @param {Object} dataToFetch
 */
export function fetchNewMapData(mapExtent, dataToFetch, knownGateways) {
  return (dispatch) => {
    dispatch({ type: mapConstants.REQUEST_MAP_GATEWAYS })
    console.log("Fetching new gateways. Already know: " + knownGateways)

    let dictOfGateways = {};

    knownGateways.forEach(function (item) {
      dictOfGateways[item] = true;
    });
    fetchBoundingBoxUrl(mapExtent)
      .then(response => response.json())
      .then(json => {
        // if ('error' in json and json.error === false)
        dispatch(receiveVisibleGateways(json.gateways))

        const missingGateways = json.gateways.reduce(function (prev, current) {
          if (dictOfGateways.hasOwnProperty(current) === false) {
            prev.push(current);
          }
          return prev;
        }, [])

        console.info("Actions: Received " + json.gateways.length + " visible gateways, missing: " + missingGateways)
        let missingGatewayRequests  = missingGateways.map((gatewayID, index) => { dispatch(fetchGatewayDetails(gatewayID)) })
        missingGatewayRequests = missingGatewayRequests.filter(request => request !== undefined);
        console.log(missingGatewayRequests)

        dispatch(batchActions(missingGatewayRequests))
      })
      .catch(error => console.log(error))
  }
}

export function fetchGatewayDetails(gatewayID) {
  console.log("Fetching details for " + gatewayID)
  return (dispatch) => {
    fetchGWDetails(gatewayID)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveGWDetails(gatewayID, json))
      }
      )
      .catch(error => console.log(error))
  }
}

    // fetchGWCircles('stellenbosch-technopark')
    //   .then(response => response.json())
    //   .then(json => console.log(json))
    //   .catch(error => console.log(error))
