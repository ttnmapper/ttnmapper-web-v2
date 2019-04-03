import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loginConstants } from '../../constants';
import { verifyExistingToken} from '../../actions/login-actions'

class _LoginChecker extends Component {

  constructor(props) {
    super(props)
    //If there is a code, dispatch a function
  }

  componentDidMount(){
    /*
    if (this.props.loggedIn === loginConstants.CheckingToken) {
      this.props.verifyExistingToken(this.props.tokens.mToken)
    }*/
  }

  render() {
    return ("")
  }
}



const mapStateToProps = state => ({
  loggedIn: state.userData.userState.loggedIn,
  tokens: state.userData.userState.tokens
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  verifyExistingToken: (mToken) => dispatch(verifyExistingToken(mToken))
})

const LoginChecker = connect(mapStateToProps, mapDispatchToProps)(_LoginChecker)

export default LoginChecker
export { _LoginChecker }
