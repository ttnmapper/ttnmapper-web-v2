//Library JS files
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'

// Our JS files
import { About, User, Home, HeaderBar, LeaderBoard, LoggedIn, FourOFour } from './components'
import { store, history } from './helpers/store'
import { UserRoute } from './components/small-components'

//Required CSS files
import './styling/styling'
import './app.css'

class App extends Component {

  constructor(props) {
    super(props)

    //This function is only called once! Load the previous coords here
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div id="app-container">
            <HeaderBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/leaderboard" component={LeaderBoard} />
              <Route path="/loggedin" component={LoggedIn} />
              <UserRoute path='/user' component={User} />
              {/* <Route path="/user" component={User} /> */}
              <Route component={FourOFour} />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}


ReactDOM.render(<App/>,document.getElementById('maps-app'))
