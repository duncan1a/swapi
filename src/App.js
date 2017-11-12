import React from 'react'
import {
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Home from './components/Home'
import Planet from './components/Planet'
import Header from './components/header/Header'
//import Modal from './components/Modal'

import './styles/app.css'

class App extends React.Component {
  previousLocation = this.props.location

  componentWillUpdate(nextProps) {
    const { location } = this.props
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    }
  }

  render() {
    const { location } = this.props
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // not initial render
    )
    return (
      <div className="App mdc-typography--body2">
        <Header />
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path='/' component={Home}/>
          <Route path='/planet/:id' component={Planet}/>
        </Switch>

      </div>
    )
  }
}
//{isModal ? <Route path='/planet/:id' component={Modal} /> : null}

export default App
