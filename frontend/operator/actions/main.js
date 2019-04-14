import store from '../store';

import * as types from '../constants/ActionTypes'

export function preLoading(url) {
	return (dispatch, getState) => {
		dispatch(appIsLoading(true));
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then((response) => response.json())
			.then((value) => {
				setTimeout(() => {
					//
					
					//
					dispatch(appIsLoading(false));
				},1000)
			})
			.catch((error) => {
				console.log(error);
				dispatch(appHasErrored(true))
			})
	}
}

export function appHasErrored(bool) {
	return {
		type: types.APP_HAS_ERRORED, hasErrored: bool
	};
}

export function appIsLoading(bool) {
	return {
		type: types.APP_IS_LOADING, isLoading: bool
	};
}
