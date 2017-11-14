import * as types from '../constants/ActionTypes'

//
export default function planets(state = {}, action) {
	switch (action.type) {

		case types.SET_PLANET:{
      // We add this to the planets object, indexed by id.
      // This makes looking up specific people much faster
			return {...state, [action.payload.id]: action.payload}
    }

		case types.SET_PLANETS:{
			// We make an object of planets indexed by api url.
      // This makes looking up specific planets much faster

			let planets = action.payload.reduce((obj, planet) => {
	        obj[planet.url] = planet;
	        return obj;
	      }, {})
      return {...state, ...planets};
		}
		default:
			return state;
	}
}
