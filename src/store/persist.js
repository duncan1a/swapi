
// this persistst the store to localstorage

export const loadState = (config) => {
	try {
		const serialisedState = localStorage.getItem('state');
		const parsedState = JSON.parse(serialisedState);
		if (parsedState.version < config.store_version) {
			localStorage.removeItem('state');
			return undefined
		}
		if (parsedState === null) {
			return undefined
		}
		return parsedState;
	} catch (err) {
		return undefined;
	}
}

export const saveState = (state) => {
	try {
		const serialisedState = JSON.stringify(state);
		localStorage.setItem('state', serialisedState);

	} catch (err) {
		console.log('save state err', err)
	}
}
