import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

import './alert-popup.css'

class _AlertPopup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let popup = ""
    if (this.props.connectionState === false) {
      popup = (<div class="alert alert-warning" role="alert">Error connecting to server.</div>)
    }

    return (
      <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          { popup }
      </ReactCSSTransitionGroup>
    );
  }
}

const mapStateToProps = state => {
  return {
    connectionState: true,
  }
}


const AlertPopup = connect(mapStateToProps)(_AlertPopup)

export default AlertPopup;
export { _AlertPopup };
