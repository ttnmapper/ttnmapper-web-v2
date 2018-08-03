import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { logoutUser, loginUser} from '../actions/user-actions'

const NavBarLogin = ({ userIsLoggedIn, logoutUser, loginUser}) => (
	<li className="nav-item">
		<Link className="nav-link" to="/" onClick={userIsLoggedIn ?() => logoutUser(): () => loginUser()} >{userIsLoggedIn ? "Logout": "Login"}</Link>
	</li>
)

const mapStateToProps = state => ({
	userIsLoggedIn: state.userData.userState.loggedIn
})

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()) ,
  loginUser: () => dispatch(loginUser())
})


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NavBarLogin)