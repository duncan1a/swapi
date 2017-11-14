import React from 'react'
import { connect } from 'react-redux'
import { fetchPeople, fetchPlanets } from './actions'
import values from 'lodash/values' // makes an array of object values

import {
  withRouter,
  Switch,
  Route
} from 'react-router-dom'


// routes
import Home from './components/Home'
import Planet from './components/Planet'
import Header from './components/header/Header'
import Modal from './components/Modal'


// css is build from the associated scss file. Watch then by running npm run watch-css
import './styles/app.css'

class App extends React.Component {
  constructor(props){
    super(props)
    this.fetchAllPeople = this.fetchAllPeople.bind(this)
    this.fetchAllPlanets = this.fetchAllPlanets.bind(this)
    this.setPlanet = this.setPlanet.bind(this)
    this.state = {
      "planet": null,
      "loadingPlanets": false,
      "loadingPeople": false,
      "peopleFetchedFromServer": 0,
      "planetsFetchedFromServer": 0
    }
  }

  componentWillMount(){
    // we get all the people and planets
    this.fetchAllPeople()
    this.fetchAllPlanets()
  }

  // sets the planet in state
  setPlanet(url){
    const { planets } = this.props;
    this.setState({
      "planet": planets[url]
    })
  }


  fetchAllPeople(next = `https://swapi.co/api/people/?page=1`){
    const { fetchPeople } = this.props
    const { peopleFetchedFromServer } = this.state
    if(next){ // there are more people to get
      this.setState({
        'loadingPeople': true
      })
      // get teh next page
      fetchPeople(next).then(result => {
        this.fetchAllPeople(result.next)
        this.setState({
          'peopleFetchedFromServer': peopleFetchedFromServer + result.results.length
        })
      })
    }else{
      // no more people to get
      this.setState({
        'loadingPeople': false
      })
    }
  }

  fetchAllPlanets(next = `https://swapi.co/api/planets/?page=1`){
    const { fetchPlanets } = this.props
    const { planetsFetchedFromServer } = this.state
    if(next){ // there are more planets to get
      this.setState({
        'loadingPlanets': true
      })
      // fetch the planets
      fetchPlanets(next).then(result => {
        this.fetchAllPlanets(result.next)
        this.setState({
          'planetsFetchedFromServer': planetsFetchedFromServer + result.results.length
        })
      })
    }else{
      // no more planets to get
      this.setState({
        'loadingPlanets': false
      })
    }
  }

  render() {
    const { loadingPeople, loadingPlanets, peopleFetchedFromServer, planetsFetchedFromServer, planet } = this.state
    const { location, planets, people } = this.props
    const url = new URLSearchParams(location.search).get('url') // needed to look up a planet

    return (
      <div className="App mdc-typography--body2">
        <Header />
        <Switch >
          <Route exact path='/' render={() => <Home planets={planets} people={values(people)} setPlanet={this.setPlanet} />} />
          <Route path='/planet' render={() =>  <Planet planet={planets[url]} />}  />
        </Switch>

        {planet ? <Modal setPlanet={this.setPlanet} planet={planet}  /> : null}

        {(loadingPeople || loadingPlanets) && (
          <div className="notices">
            {loadingPeople && <div className="notice">Updating people ... {peopleFetchedFromServer} </div>}
            {loadingPlanets && <div className="notice">Updating planets ... {planetsFetchedFromServer} </div>}
          </div>
        )}

      </div>
    )
  }
}


App.defaultProps = {
  people: {},
  planets: {}
}


const mapStateToProps = state => {
  return {
    people: state.people,
    planets: state.planets
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPeople: (url )=> {
      return dispatch(fetchPeople(url))
    },
    fetchPlanets: (url )=> {
      return dispatch(fetchPlanets(url))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
