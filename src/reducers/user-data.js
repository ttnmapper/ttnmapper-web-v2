import { combineReducers } from 'redux'

import { applications } from './applications.js'
import { devices } from './devices.js'
import { gateways } from './gateways.js'
import { userState } from './user-state.js'
import { mapDetails} from './map-details.js'

export const userData = combineReducers({
	'applications': applications,
	'devices': devices,
	'gateways': gateways,
  'userState': userState,
  'mapDetails' : mapDetails
})
