import React, { Component } from 'react'
import { connect } from 'react-redux'

import {sendCodeToBackend} from '../../actions/login-actions'

class _LoggedIn extends Component {
  render() {
    return (
      <div className="container textBlock">
        <div className="loading-div card">
          <span >Logging in...</span>
          <span className="oi" id="loading" data-glyph="cog" title="icon name" aria-hidden="true"></span>
        </div>
      </div>
    )
  }

  componentDidMount() {
    console.log("Component did mount")
    if ('location' in this.props && 'search' in this.props.location && this.props.location.search !== "") {
      var partsOfStr = this.props.location.search.substring(1).split('&');
      let parsedRetVal = {}

      for (var ind in partsOfStr) {
        //Split into name and value
        var assignment = partsOfStr[ind].split('=')
        if (assignment.length == 2) {
          switch (assignment[0]) {
            case 'code': parsedRetVal.code = assignment[1]; break;
            case 'state': parsedRetVal.state = assignment[1]; break;
          }
        }
      }

      this.props.sendCodeToBackend(parsedRetVal.code)
      return
    }
    console.log("Error, redirecting!")
  }
}


const mapStateToProps = state => {
  return {
    userData: state.userData,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  sendCodeToBackend: (code) => dispatch(sendCodeToBackend(code)),
})

const LoggedIn = connect(mapStateToProps, mapDispatchToProps)(_LoggedIn)

export default LoggedIn
export { _LoggedIn }
