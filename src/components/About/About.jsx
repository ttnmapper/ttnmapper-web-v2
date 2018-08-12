import React, { Component } from 'react'
import { connect } from 'react-redux'

class _About extends Component {
  render() {
    return (
    <div>About</div> )
  }
}

const mapStateToProps = state => {
  return {}
}

const About = connect(
  mapStateToProps
)(_About)

export default About;
export { _About }
