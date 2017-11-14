import configureStore from './configureStore';
import { loadState, saveState } from './persist';

const config = {store_version: 1};

const initialState = loadState(config);
const store = configureStore(initialState);

store.subscribe(() => {
	// persist the state
	saveState(store.getState())
})

store.dispatch({
	type: 'SET_STORE_VERSION',
	payload: config.store_version
})


export default store;
