import { LoggedIn } from "./components";


export const dataConstants = {
  REQUEST_DEVICES: 'REQUEST_DEVICES',
  RECEIVE_DEVICES: 'RECEIVE_DEVICES',
  RECEIVE_DEVICES_FAILED: 'RECEIVE_DEVICES_FAILED',

  REQUEST_APPLICATIONS: 'REQUEST_APPLICATIONS',
  RECEIVE_APPLICATIONS: 'RECEIVE_APPLICATIONS',
  RECEIVE_APPLICATIONS_FAILED: 'RECEIVE_APPLICATIONS_FAILED',

  INVALIDATE_DEVICES_DATA: 'INVALIDATE_DEVICES_DATA',

  TOGGLE_DEVICE_PANE: 'TOGGLE_DEVICE_PANE',
}

export const UPDATE_MAP_POSITION = 'UPDATE_MAP_POSITION'

export const mapConstants = {
  REQUEST_MAP_GATEWAYS: 'REQUEST_MAP_GATEWAYS',
  RECEIVE_MAP_GATEWAYS: 'RECEIVE_MAP_GATEWAYS',
  RECEIVE_MAP_GATEWAYS_FAILED: 'RECEIVE_MAP_GATEWAYS_FAILED',

  REQUEST_GATEWAY_DETAILS: 'REQUEST_GATEWAY_DETAILS',
  RECEIVE_GATEWAY_DETAILS: 'RECEIVE_GATEWAY_DETAILS',
  RECEIVE_GATEWAY_DETAILS_FAILED: 'RECEIVE_GATEWAY_DETAILS_FAILED',
  

  REQUEST_MAP_GW_RADAR: 'REQUEST_MAP_GW_RADAR',
  RECEIVE_MAP_GW_RADAR: 'RECEIVE_MAP_GW_RADAR',
  RECEIVE_MAP_GW_RADAR_FAILED: 'RECEIVE_MAP_GW_RADAR_FAILED',

  REQUEST_MAP_GW_ALPHA: 'REQUEST_MAP_GW_ALPHA',
  RECEIVE_MAP_GW_ALPHA: 'RECEIVE_MAP_GW_ALPHA',
  RECEIVE_MAP_GW_ALPHA_FAILED: 'RECEIVE_MAP_GW_ALPHA_FAILED',

  REQUEST_MAP_GW_COLOR_RADAR: 'REQUEST_MAP_GW_COLOR_RADAR',
  RECEIVE_MAP_GW_COLOR_RADAR: 'RECEIVE_MAP_GW_COLOR_RADAR',
  RECEIVE_MAP_GW_COLOR_RADAR_FAILED: 'RECEIVE_MAP_GW_COLOR_RADAR_FAILED',

  REQUEST_PACKETS_DETAILS: 'REQUEST_PACKETS',
  RECEIVE_PACKETS_DETAILS: 'RECEIVE_PACKETS_DETAILS',
  RECEIVE_PACKETS_DETAILS_FAILED: 'RECEIVE_PACKETS_DETAILS_FAILED',

  SET_VISIBLE_GATEWAYS: 'SET_VISIBLE_GATEWAYS',

  SET_SINGLE_GATEWAY:'SET_SINGLE_GATEWAY',
  ADD_SINGLE_GATEWAY: 'ADD_SINGLE_GATEWAY',
  CLEAR_SINGLE_GATEWAY:'CLEAR_SINGLE_GATEWAY',

  LAYER_TONERLITE: 'LAYER_TONERLITE',
  LAYER_OSM_MAPNIK: 'LAYER_OSM_MAPNIK',
  LAYER_TERRAIN: 'LAYER_TERRAIN',
  LAYER_SATELLITE: 'LAYER_SATELLITE',
  LAYER_OPEN_TOPO_MAP: 'LAYER_OPEN_TOPO_MAP',

  RENDER_MODE_NONE: 'RENDER_MODE_NONE',
  RENDER_MODE_GRID: 'RENDER_MODE_GRID',
  RENDER_MODE_RADAR: 'RENDER_MODE_RADAR',
  RENDER_MODE_COLOR_RADAR: 'RENDER_MODE_COLOR_RADAR',
  RENDER_MODE_ALPHA: 'RENDER_MODE_ALPHA',

  CHANGE_MAP_LAYER: 'CHANGE_MAP_LAYER',
  CHANGE_MAP_COVERAGE: 'CHANGE_MAP_COVERAGE',

  RENDER_COLLECTION_ALL: 'RENDER_COLLECTION_ALL',
  RENDER_COLLECTION_LIST: 'RENDER_COLLECTION_LIST'
}

export const gatewayModeConstants = {
  SPECIAL_MODE_NORMAL: 'SPECIAL_MODE_NORMAL',
  SPECIAL_MODE_LIST: 'SPECIAL_MODE_LIST',
  SPECIAL_MODE_AGGREGATED: 'SPECIAL_MODE_AGGREGATED',

  // Dispatched by button to enable state
  ACTIVATE_SPECIAL_MODE: 'ACTIVATE_SPECIAL_MODE',

  // Disaptched by plus sign to verify entered gateway
  REQUEST_ADD_GW_TO_LIST: 'ADD_GW_TO_LIST',
  // Dispatched by remove sign to remove gw
  REQUEST_REMOVE_GW_FROM_LIST : 'REQUEST_REMOVE_GW_FROM_LIST',

  // These can be dispatched to add/remove special gws
  SMGW_ADD: 'SMGW_ADD',
  SMGW_REMOVE: 'SMGW_REMOVE',
}

export const loginConstants = {
  SEND_CODE_TO_BACKEND: 'SEND_CODE_TO_BACKEND',
  RECEIVE_LOGIN_TICKET: 'RECEIVE_LOGIN_TICKET',
  CHECK_LOGIN_TICKET: 'CHECK_LOGIN_TICKET',
  RECEIVE_TOKENS: 'RECEIVE_TOKENS',
  RECEIVE_TOKENS_FAILURE: '',

  USER_LOGGED_IN: 'USER_LOGGED_IN',
  LOG_OUT_REQUESTED: 'LOG_OUT_REQUESTED',
  USER_LOGGED_OUT: 'USER_LOGGED_OUT',

  RETURNING_LOGIN_USER: 'RETURNING_LOGIN_USER',


  LoggedIn: 'LoggedIn',
  LoggedOut: 'LoggedOut',
  CheckingToken: 'CheckingToken'
}
