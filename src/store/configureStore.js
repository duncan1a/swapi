import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import * as reducers from '../reducers';

const reducer = combineReducers(reducers);
const NODE_ENV = process.env;

export default function configureStore(initialState) {
  // producction store
	const store = createStore(reducer, initialState, compose(
		applyMiddleware(thunkMiddleware)
	));
  // enableredux devtool for development
  const devStore = createStore(reducer, initialState, compose(
		applyMiddleware(thunkMiddleware),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextReducer = require('../reducers');
			store.replaceReducer(nextReducer);
		});
	}

	return NODE_ENV === 'development'? devStore : store;
}
