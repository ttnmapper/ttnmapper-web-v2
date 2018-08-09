import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class _User extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <ul className="nav nav-tabs user-nav">
            <li className="nav-item"><NavLink className="nav-link user-tab-options" activeClassName="user-tab-selected" to="/user/devices">Devices</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link user-tab-options" activeClassName="user-tab-selected" to="/user/gateways">Gateways</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link user-tab-options" activeClassName="user-tab-selected" to="/user/experiments">Experiments</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link user-tab-options" activeClassName="user-tab-selected" to="/user/settings">Settings</NavLink></li>
          </ul>
        </div>
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
