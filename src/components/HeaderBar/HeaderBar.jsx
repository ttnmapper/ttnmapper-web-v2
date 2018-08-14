import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import './headerbar.css'

import unknownUser from './unknownUser.png';
import mainLogo from './logo.png';

class _HeaderBar extends Component {

  renderBrand() {
    return (
      <nav id="navbar-brand">
        <div className="nav-item">
          <NavLink className="nav-link" to="/">
            <img id="branding-icon" src={mainLogo} width="30" height="30" className="d-inline-block align-middle" alt="" />
            <span>TTN Mapper</span>
          </NavLink>
        </div>
      </nav>)
  }

  renderNavigation() {
    let menuOptions = [
      (<li key="aboutlink" className="nav-item"><NavLink className="nav-link navbar-highlight" to="/about">About</NavLink></li>),
      (<li key="leaderboardlink" className="nav-item"><NavLink className="nav-link navbar-highlight" to="/leaderboard">Leader Board</NavLink></li>)
    ]
    if (this.props.userState.loggedIn) {
      menuOptions.push(<li key="myDataLink" className="nav-item"><NavLink className="nav-link navbar-highlight" to="/user">My Data</NavLink></li>)
    }

    const navbarUser = this.renderLoginOptions()
    return (
      <nav id="navbar-navigation" className="collapse navbar-collapse">
        <ul className="navbar-nav" id="leftnav">
          {menuOptions}

        </ul>
        <ul className="navbar-nav" id="rightnav">
          {navbarUser}
        </ul>
      </nav>)
  }

  /**
   * Render and return the login tab on the right on the navbar
   */
  renderLoginOptions() {
    if (this.props.userState.loggedIn) {
      return [
        (
          <li id="user-nav-item" className="nav-item" key="userlink">
            <div className="nav-link">
              <img id="user-icon" src={unknownUser} width="30" height="30" className="d-inline-block align-middle" alt="" />
              <span>
                Hi, {this.props.userState.userName}
              </span>
            </div>
          </li>
        ),
        (
          <li id="user-nav-item" className="nav-item" key="usersettingslink">
            <div className="nav-link navbar-highlight">
		          <span className="oi" data-glyph="cog" title="icon name" aria-hidden="true" style={{color: "inherit"}}></span>
            </div>
          </li>
        )
      ]

    }
    else {
      return (
        <li id="user-nav-item" key="loginlink" className="nav-item">
          <NavLink className="nav-link navbar-highlight" to="/login">Login</NavLink>
        </li>
      )
    }
  }

  render() {
    const navbarBrand = this.renderBrand()
    const navbarNavigation = this.renderNavigation()
    const navbarButton = (
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-navigation" aria-controls="navbar-navigation" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>)

    return (
      <nav id="navbar" className="navbar navbar-expand-sm ">
        {navbarBrand}
        {navbarButton}
        {navbarNavigation}
      </nav>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if (this.props.location.pathname !== nextProps.location.pathname) {
    //   return true
    // }
    // return false
    return true
  }

}



const mapStateToProps = state => ({
  userState: state.userData.userState
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const HeaderBar = connect(
  mapStateToProps
)(_HeaderBar)

export default HeaderBar
export { _HeaderBar }
