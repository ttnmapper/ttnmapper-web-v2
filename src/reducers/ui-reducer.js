import { combineReducers } from 'redux'


function devices(state={}, action){
	return state
}

function device_display_mode(state="", action){
	return state
}


function expanded_panes(state={}, action) {
	if (action.type == 'TOGGLE_PANE') {
		let target_pane = action.payload.device_uid
		return Object.assign({}, ...state, !state[target_pane])
	}
	return state
}

export const ui = combineReducers({
	devices: combineReducers ({
		display_mode: device_display_mode,
		expandedPanes:expanded_panes
	})
})
