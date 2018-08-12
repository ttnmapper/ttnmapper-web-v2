import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import logger from 'redux-logger'
import { createBrowserHistory } from 'history'
import { Route, Switch } from 'react-router' // react-router v4
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'

import * as reducers from './reducers'
import { About, User, Home, HeaderBar, LeaderBoard } from './components'

const rootReducer = combineReducers({
  ...reducers,
})

const history = createBrowserHistory()

const store = createStore(
  connectRouter(history)(rootReducer),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      logger
    )
  )
)


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route path="/" component={HeaderBar} />
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/user" component={User} />
          <Route exact path="/leaderboard" component={LeaderBoard} />


          <Route exact path="/user/devices" component={User} />
          <Route exact path="/user/gateways" component={User} />
          <Route exact path="/user/experiments" component={User} />
          <Route exact path="/user/settings" component={User} />

        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('maps-app')
)

// <Route path="/about" component={About} />
// <Route path="/user" component={User} />
