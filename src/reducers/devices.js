
import { USER_LOGGED_OUT} from '../constants'

export function devices(state = {}, action) {
	if (action.type === USER_LOGGED_OUT) {
		// Clear the data!
		return {}
	}
	
	return state
}
