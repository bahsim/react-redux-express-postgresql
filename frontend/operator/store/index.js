import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { combineReducers } from 'redux';
import * as main 					from '../reducer/main';

export default function configureStore(initialState) {
	initialState = initialState || {};
	return createStore(
			combineReducers({ 
				...main, 
			}),
			initialState,
			compose(applyMiddleware(thunk))
	);
}
