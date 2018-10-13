import React from 'react'
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'
import {User} from '.'
import { loginConstants } from '../constants';

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
    console.log(this.props.location)

    if (this.props.loggedIn == loginConstants.LoggedIn) {
      // User is properly logged in
      return <Route path="/user" component={User} />

    } else {
      // Send both the return address and a unique key to the server. We need to verify the key
      // against local storge upon returning

      const location = btoa(JSON.stringify({
        l: this.props.location.pathname + this.props.location.search,
        k:'1asd'
      }))

      if (this.props.loggedIn == loginConstants.CheckingToken) {
        // We just need to wait while the token is verified
        return (<Redirect to={"/loggedin?state=" + location} />)
      }
      else {
        // This should actually redirect to "you need to login!"
        return (<Redirect to="/" />)
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.userData.userState.loggedIn,
  }
}

const UserRoute = connect(mapStateToProps)(_UserRoute)
export { UserRoute };
