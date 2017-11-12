import * as types from '../constants/ActionTypes'

//
export default function config(state = {}, action) {
	switch (action.type) {

		case types.SET_STORE_VERSION:
      // this version is used to clear the offline store if necessary
			return {...state, version: action.payload}

		default:
			return state;
	}
}
