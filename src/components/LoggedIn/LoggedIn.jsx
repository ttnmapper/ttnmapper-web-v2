
import React, { Component } from 'react'
import { connect } from 'react-redux'

class _LoggedIn extends Component {
  render() {
    return (
      <div className="container">
        User logged in!
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const LoggedIn = connect(
  mapStateToProps
)(_LoggedIn)

export default LoggedIn
export { _LoggedIn }
