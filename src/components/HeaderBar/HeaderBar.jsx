import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import './headerbar.css'

import unknownUser from './unknownUser.png';
import mainLogo from './logo.png';
import { getTTNLoginLink } from '../../api-calls'
import { loginConstants } from '../../constants';
import { logout } from '../../actions/login-actions'

class _HeaderBar extends Component {

  nonMapStyle = {
    position: 'fixed',
    top: '0px',
    width:'100%',
  }

  constructor(props){
    super(props)

    this.logout = this.props.logout.bind(this)
  }

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
    if (this.props.loggedIn === loginConstants.LoggedIn) {
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
  //

  /**
   * Render and return the login tab on the right on the navbar
   */
  renderLoginOptions() {
    if (this.props.loggedIn === loginConstants.LoggedIn) {
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
          <div className="dropdown show">
            <a className="dropdown-toggle nav-link navbar-highlight" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="glyphicon glyphicon-cog oi" data-glyph="cog" title="icon name" aria-hidden="true" style={{color: "inherit"}}></span>
            </a>

              <div className="custom-dropdown-menu dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a className="custom-dropdown-item navbar-highlight" href="#">User Settings</a>
                <a className="custom-dropdown-item navbar-highlight" onClick={this.logout} href="#">Logout</a>
              </div>
            </div>
            {/* <div className="test-div" >
            This is a test
            </div> */}

          </li>
        )
      ]

    }
    else {
      return (
        <li id="user-nav-item" key="loginlink" className="nav-item">
          <a className="nav-link navbar-highlight" href={ getTTNLoginLink() }>{this.props.loggedIn===loginConstants.LoggedIn ? "Logout": "Login"}</a>
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

    let style = {}
    if (this.props.router.location.pathname !== '/' ) {
      style = this.nonMapStyle
    }

    return (
      <nav id="navbar" className="navbar navbar-expand-sm " style={style}>
        {navbarBrand}
        {navbarButton}
        {navbarNavigation}
      </nav>
    )
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.currentRoute !== nextProps.currentRoute) {
  //     return true
  //   }
  //   return false
  // }

}



const mapStateToProps = state => ({
  router: state.router,
  loggedIn: state.userData.userState.loggedIn,
  userState: state.userData.userState,
  currentRoute: state.router.location.pathname,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: (currentPosition) => dispatch(logout(currentPosition))
})

const HeaderBar = connect(mapStateToProps,mapDispatchToProps)(_HeaderBar)

export default HeaderBar
export { _HeaderBar }
