import 'whatwg-fetch'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store/store';

const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route component={App} />
      </Router>
    </Provider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();

Root.propTypes = {
  store: PropTypes.object.isRequired
}
