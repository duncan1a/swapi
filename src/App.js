import React from 'react'
import { connect } from 'react-redux'
import { fetchPeople, fetchPlanets } from './actions'
import values from 'lodash/values'

import {
  withRouter,
  Switch,
  Route
} from 'react-router-dom'

import Home from './components/Home'
import Planet from './components/Planet'
import Header from './components/header/Header'
import Modal from './components/Modal'

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
      "planetsFetchedFromServer": 0,
      "columns": {
        "name": [],
        "planet": [],
        "created": [],
        "edited": []
      }
    }
  }

  componentWillMount(){
    this.fetchAllPeople()
    this.fetchAllPlanets()
  }

  setPlanet(url){
    const { planets } = this.props;
    this.setState({
      "planet": planets[url]
    })
  }


  fetchAllPeople(next = `https://swapi.co/api/people/?page=1`){
    const { fetchPeople } = this.props
    const { peopleFetchedFromServer } = this.state
    if(next){
      this.setState({
        'loadingPeople': true
      })
      fetchPeople(next).then(result => {
        this.fetchAllPeople(result.next)
        this.setState({
          'peopleFetchedFromServer': peopleFetchedFromServer + result.results.length
        })
      })
    }else{
      this.setState({
        'loadingPeople': false
      })
    }
  }

  fetchAllPlanets(next = `https://swapi.co/api/planets/?page=1`){
    const { fetchPlanets } = this.props
    const { planetsFetchedFromServer } = this.state
    if(next){
      this.setState({
        'loadingPlanets': true
      })
      fetchPlanets(next).then(result => {
        this.fetchAllPlanets(result.next)
        this.setState({
          'planetsFetchedFromServer': planetsFetchedFromServer + result.results.length
        })
      })
    }else{
      this.setState({
        'loadingPlanets': false
      })
    }
  }

  render() {
    const { loadingPeople, loadingPlanets, peopleFetchedFromServer, planetsFetchedFromServer, planet } = this.state
    const { location, planets, people } = this.props
    const url = new URLSearchParams(location.search).get('url')

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
