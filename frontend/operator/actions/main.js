import store from '../store';

import * as types from '../constants/ActionTypes'

export function preLoading(urlRegistry) {
	return (dispatch, getState) => {
		setTimeout(() => {
			dispatch(fetchAuthors('/authors'))
			dispatch(fetchUsers('/users'))
			dispatch(fetchRegistry(urlRegistry))
		}, 500)
	}
}

export function fetchRegistry(url) {
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
				dispatch(putRegistry(value))
				dispatch(appIsLoading(false))
			})
			.catch((error) => {
				dispatch(appHasErrored(error))
			})
	}
}

export function fetchAuthors(url) {
	return (dispatch, getState) => {
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then((response) => response.json())
			.then((value) => {
				dispatch(putAuthors(value))
			})
			.catch((error) => {
				dispatch(appHasErrored(error))
			})
	}
}

export function fetchUsers(url) {
	return (dispatch, getState) => {
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then((response) => response.json())
			.then((value) => {
				dispatch(putUsers(value))
			})
			.catch((error) => {
				dispatch(appHasErrored(error))
			})
	}
}

export function fetchCheckBook(params, callback) {
	return (dispatch, getState) => {
		const { bookid, userid, username, available } = params
		const url = `/books/${bookid}`
		const body = {userid, username, available}
		
		dispatch(appIsLoading(true))
		
		fetch(url,{ method: 'PUT', body: JSON.stringify(body) })
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then((response) => response.json())
			.then((value) => {
				callback(value)
			})
			.catch((error) => {
				dispatch(appHasErrored(error))
			})
	}
}

export function appHasErrored(value) {
	return {
		type: types.APP_HAS_ERRORED, hasErrored: value
	};
}

export function appIsLoading(bool) {
	return {
		type: types.APP_IS_LOADING, isLoading: bool
	};
}

export function putRegistry(value) {
	return {
		type: types.REGISTRY_PUT, value
	}
}

export function putAuthors(value) {
	return {
		type: types.AUTHORS_PUT, value
	}
}

export function putUsers(value) {
	return {
		type: types.USERS_PUT, value
	}
}
