import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

import './alert-popup.css'

class _AlertPopup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let popups = []

    const display = this.props.network.connected ? "none" : ""

    if (true) {
      popups.push((
        <div id="warning-container" style={{display:display}} key="warning-div">
          <div className="alert alert-warning" id="connection-warning" role="alert">Error connecting to server.</div>
        </div>))
    }

    return popups
  }
}

const mapStateToProps = state => {
  return {
    network: state.network,
  }
}


const AlertPopup = connect(mapStateToProps)(_AlertPopup)

export default AlertPopup;
export { _AlertPopup };
