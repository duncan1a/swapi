import * as types from '../constants/ActionTypes'

//
export default function planets(state = {}, action) {
	switch (action.type) {

		case types.SET_PLANET:{
      // We add this to the planets object, indexed by id.
      // This makes looking up specific people much faster
			return {...state, [action.payload.id]: action.payload}
    }
		default:
			return state;
	}
}
