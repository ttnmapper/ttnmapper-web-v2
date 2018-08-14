import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Route, Switch } from 'react-router'

import { Devices } from '../../components'
import { Gateways } from '../../components'

import './user.css'

class _User extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <ul className="nav nav-tabs" id="nav-user-tab">
            <li className="nav-item"><NavLink className="nav-link user-tab-options" activeClassName="user-tab-selected" to="/user/devices">Devices</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link user-tab-options" activeClassName="user-tab-selected" to="/user/gateways">Gateways</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link user-tab-options" activeClassName="user-tab-selected" to="/user/experiments">Experiments</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link user-tab-options" activeClassName="user-tab-selected" to="/user/settings">Settings</NavLink></li>
          </ul>
        </div>
        <Switch>
          <Route path="/user/devices" component={Devices} />
          <Route path="/user/gateways" component={Gateways} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const User = connect(
  mapStateToProps
)(_User)

export default User
export { _User }
