import {combineReducers} from 'redux'
import { UPDATE_MAP_POSITION } from '../constants'
import { mapConstants} from '../constants'
import { map } from 'leaflet';



export function currentPosition(state, action) {
	if (typeof state == 'undefined') {
    //Demo position for now
		return {lat: -32.40405, long: 20.24230, zoom: 7}
  }

	switch (action.type) {
		case UPDATE_MAP_POSITION:
      return action.newPosition;
    default:
      return state;
  }
}

export function renderingMode(state, action) {
  if (typeof state == 'undefined') {
		return {mode: mapConstants.RENDER_MODE_GRID, active_gws: []}
  }

  switch (action.type) {
    case mapConstants.CHANGE_MAP_COVERAGE:
      return {mode: action.payload.newCoverage}
    default:
      return state
  }
}

export function mapLayer(state, action) {
  if (typeof state == 'undefined') {
    return {layer: mapConstants.LAYER_TONERLITE}
  }

  switch (action.type) {
    case mapConstants.CHANGE_MAP_LAYER:
      return {layer: action.payload.newLayer}
    default:
      return state
  }
}

export function gatewayDetails(state, action) {
  if (typeof state == 'undefined') {
		return {}
  }

  switch (action.type) {
    // We might need to make a new entry in the list
    case mapConstants.RECEIVE_GATEWAY_DETAILS:
      return Object.assign({}, state, action.payload.listOfGateways)
    default:
      return state;
  }
}

export function gatewayRadarCover(state, action) {
  if (typeof state == 'undefined') {
		return {}
  }

  switch (action.type) {
    // We might need to make a new entry in the list
    case mapConstants.RECEIVE_MAP_GW_RADAR:
      return Object.assign({}, state, action.payload.listOfGateways)
    default:
      return state;
  }
}

export function visibleGateways(state, action) {
  if (typeof state == 'undefined') {
		return []
  }

  switch (action.type) {
    case mapConstants.SET_VISIBLE_GATEWAYS: {

      // Update the list of current gateways
      return action.payload.listOfGateways
    }
    default:
      return state;
  }
}

function renderSingle(state, action) {
  if (typeof state == 'undefined') {
		return []
  }
  switch (action.type) {
    case mapConstants.SET_SINGLE_GATEWAY:
      return [{gatewayID: action.payload.gatewayID, mode: action.payload.mode}]
    case mapConstants.ADD_SINGLE_GATEWAY:
      return [...state, {gatewayID: action.payload.gatewayID, mode: action.payload.mode}]
    case mapConstants.CLEAR_SINGLE_GATEWAY:
      return [];
    default:
      return state;
  }
}

function gatewayAlphaShapes(state, action) {
  if (typeof state == 'undefined') {
		return {}
  }

  switch (action.type) {
    // We might need to make a new entry in the list
    case mapConstants.RECEIVE_MAP_GW_ALPHA:
      return Object.assign({}, state, {[action.payload.gatewayID]: action.payload.geoJson})
    default:
      return state;
  }
}

/*
function packetsQuery(state, action) {
  if (typeof state == 'undefined') {
    return {}
  }

  switch (action.type) {
    case mapConstants.RECEIVE_PACKETS_DETAILS:
      return action.payload.packetRequest
    default:

      return state
  }
}

function packetsData(state,action) {
  if (typeof state == 'undefined') {
		return []
  }

  switch (action.type) {
    case mapConstants.RECEIVE_PACKETS_DETAILS:
      return action.payload.packetData
    default:
      return state
  }
}*/

export const mapDetails = combineReducers({
  currentPosition: currentPosition,
  renderingMode: renderingMode,
  mapLayer: mapLayer,
  gatewayDetails: gatewayDetails,
  visibleGateways: visibleGateways,
  gatewayRadarCover: gatewayRadarCover,
  gatewayAlphaShapes: gatewayAlphaShapes,
  renderSingle: renderSingle,
  // packets: combineReducers({
  //   packetsQuery, packetsData
  //  })
})
