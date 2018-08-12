//Library JS files
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'

// Our JS files
import { About, User, Home, HeaderBar, LeaderBoard } from './components'
import {store, history} from './helpers/store'

//Required CSS files
import './styling/styling'
import './app.css'

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
