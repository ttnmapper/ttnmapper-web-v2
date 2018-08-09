import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class _HeaderBar extends Component {
  render() {
    return (
      <nav id="navbar" className="navbar navbar-dark navbar-expand-xl">
        <nav className="navbar">
          <NavLink className="nav-link" to="/">
            <img src="/images/logo.png" width="30" height="30" className="d-inline-block align-top" alt="" />
            TTN Mapper
          </NavLink>
        </nav>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapsable" aria-controls="navbarCollapsable" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapsable">
          <ul className="navbar-nav">
            <li className="nav-item ">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/leaderboard">Leader Board</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/user">My Data</NavLink>
            </li>

          </ul>
        </div>

      </nav>
    )
  }
}

const mapStateToProps = state => ({
})

const HeaderBar = connect(
  mapStateToProps
)(_HeaderBar)

export default HeaderBar
export { _HeaderBar }
