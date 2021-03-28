import { createStore as createReduxStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer, { IState } from './reducer';
import { effectsMiddleware } from '../lib/redux-effects';
import { ActionObject } from './action-types';
import { rootEffect } from './effects';

export type Store = {
	getState(): IState;
	subscribe(cb: () => void): void;
	dispatch(action: ActionObject): void;
};

export function createStore(): Store {
	const store: Store = createReduxStore(
		rootReducer,
		undefined,
		applyMiddleware(effectsMiddleware(rootEffect), logger)
	);

	return store;
}
