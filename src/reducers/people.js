import * as types from '../constants/ActionTypes'

//
export default function people(state = {}, action) {
	switch (action.type) {

		case types.SET_PEOPLE:{
			// We make an object of people indexed by name.
      // This makes looking up specific people much faster
      // In this perticular app we don't really need to do that,
			// but we should do it anyway becasue the future is not written in stone
			let people = action.payload.reduce((obj, person) => {
	        obj[person.name] = person;
	        return obj;
	      }, {})
      return {...state, ...people};
		}

		default:
			return state;
	}
}
