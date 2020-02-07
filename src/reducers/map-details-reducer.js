import {combineReducers} from 'redux'
import gatewayMode from './gatewaymode-reducer'
import { UPDATE_MAP_POSITION, mapConstants} from '../constants'


/*
 * Update the position after the map was moved. This is later written to url and localstorage
*/
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

/*
 * Set which coverage is rendered.
 *
 * Todo: Unify the naming to coverage
*/
export function renderingMode(state, action) {
  if (typeof state == 'undefined') {
		return {mode: mapConstants.RENDER_MODE_GRID, active_gws: []}
  }

  switch (action.type) {
    case mapConstants.CHANGE_MAP_COVERAGE:
      return {mode: action.payload.newCoverage, active_gws: state.active_gws}
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

function gatewayAlphaShapes(state, action) {
  if (typeof state == 'undefined') {
		return {}
  }

  switch (action.type) {
    // We might need to make a new entry in the list
    case mapConstants.RECEIVE_MAP_GW_ALPHA:
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



export const mapDetails = combineReducers({
  currentPosition: currentPosition,
  renderingMode: renderingMode,
  mapLayer: mapLayer,
  gatewayDetails: gatewayDetails,
  visibleGateways: visibleGateways,
  gatewayRadarCover: gatewayRadarCover,
  gatewayAlphaShapes: gatewayAlphaShapes,
  gatewayMode: gatewayMode,
})
