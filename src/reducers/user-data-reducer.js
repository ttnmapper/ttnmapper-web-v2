import { combineReducers } from 'redux'

import { applications } from './applications-reducer.js'
import { devices } from './devices-reducer.js'
import { gateways } from './gateways-reducer.js'
import { userState } from './user-state-reducer.js'
import { mapDetails} from './map-details-reducer.js'

export const userData = combineReducers({
	'applications': applications,
	'devices': devices,
	'gateways': gateways,
  'userState': userState,
  'mapDetails' : mapDetails
})
