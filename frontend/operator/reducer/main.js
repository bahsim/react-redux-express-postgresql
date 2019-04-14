
import * as types from '../constants/ActionTypes'

export function appHasErrored(state = false, action) {
	switch (action.type) {
		case types.APP_HAS_ERRORED:
			return action.hasErrored;
		default:
			return state;
	}
}
export function appIsLoading(state = false, action) {
	switch (action.type) {
		case types.APP_IS_LOADING:
			return action.isLoading;
		default:
			return state;
	}
}
