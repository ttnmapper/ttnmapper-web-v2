import React from 'react'
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'
import {User} from '.'

export const UserDataLoading = ({appName}) => (
	<div className="loading-div card">
	 	<span >Loading user data</span>
		<span className="oi" id="loading" data-glyph="cog" title="icon name" aria-hidden="true"></span>
	</div>
)

export const UserDataError = ({appName}) => (
	<div className="loading-div card">
	 	<span >Error loading user data. Try <a href="#">reloading</a></span>
		<span className="oi" data-glyph="warning" title="icon name" aria-hidden="true"></span>
	</div>
)

 class _UserRoute extends React.Component {
  render() {
    if (!this.props.loggedIn) {
      return (<Redirect to="/" />)
    }
    return <Route path="/user" component={User} />
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.userData.userState.loggedIn,
  }
}

const UserRoute = connect(mapStateToProps)(_UserRoute)
export { UserRoute };
