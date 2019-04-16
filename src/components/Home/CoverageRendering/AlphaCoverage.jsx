// Render the Alpha coverage
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Overlay } from 'react-leaflet'

class _AlphaCoverage extends Component {
    render() {
        return null
    }
}

const mapStateToProps = state => {
    return {}
  }

const AlphaCoverage = connect(mapStateToProps)(_AlphaCoverage)

export default AlphaCoverage;
export { _AlphaCoverage };