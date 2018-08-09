import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import logger from 'redux-logger'

import * as reducers from './reducers'
import {About,User,Home, HeaderBar, LeaderBoard} from './components'

const rootReducer = combineReducers({
  ...reducers
})

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    logger
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <HeaderBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/user" component={User} />
        <Route exact path="/leaderboard" component={LeaderBoard} />


        <Route exact path="/user/devices" component={User} />
        <Route exact path="/user/gateways" component={User} />
        <Route exact path="/user/experiments" component={User} />
        <Route exact path="/user/settings" component={User} />

      </div>
    </Router>
  </Provider>,
  document.getElementById('maps-app')
)

// <Route path="/about" component={About} />
// <Route path="/user" component={User} />
