import * as types from '../constants/ActionTypes'

const api_root = 'https://swapi.co/api'


export const fetchPeople = (url = `${api_root}/people/?page=1`) =>  dispatch => fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: types.SET_PEOPLE,
          payload: json.results
        })

        return json
      })
      .catch(e => {
        console.log(e);
      })


export const fetchPlanets = (url = `${api_root}/planets/?page=1`) =>  dispatch => fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: types.SET_PLANETS,
          payload: json.results
        })

        return json
      })
      .catch(e => {
        console.log(e);
      })
