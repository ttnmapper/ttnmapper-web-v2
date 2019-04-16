
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LayersControl } from 'react-leaflet'



class _CoverageRendering extends Component {
    render() {
        return null
    }
}

const mapStateToProps = state => {
    return {}
  }

const CoverageRendering = connect(mapStateToProps)(_CoverageRendering)

export default CoverageRendering;
export { _CoverageRendering };