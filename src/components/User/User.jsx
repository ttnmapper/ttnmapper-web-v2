import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Route } from 'react-router'

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
        <Route exact path="/user/devices" component={Devices} />
        <Route exact path="/user/gateways" component={Gateways} />
        {/* <Route exact path="/user/experiments" component={User} />
        <Route exact path="/user/settings" component={User} /> */}
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
