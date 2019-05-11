// Render the radar coverage
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FeatureGroup, GeoJSON } from 'react-leaflet'

const alphaStyle = {
  stroke: false,
  fillOpacity: 0.25,
  fillColor: "#37d699",
  zIndex: 25
}

/*
  Render multiple or individual alpha coverage patterns.

  The alpha coverage is a geometric shape which tries to approximate the area
  in which a gateway has coverage. These are calculated on the backend, and 
  sent to the front end as a geojson string.
*/
class _AlphaCoverage extends Component {


  constructor(props) {
      super(props)
  }

  drawGatewayAlpha(gatewayID) {
    if (gatewayID in this.props.gatewayAlphaShapes) {
      const key = "alpha_cover_" + gatewayID
      const data = this.props.gatewayAlphaShapes[gatewayID]
      return <GeoJSON key={key} data={data} style={alphaStyle} />
    }
    else {
        return ""
      }
    }

  /**
   * React render function
   */
  render() {
    if (this.props.visibleGateways) {
      if (this.props.singleGateway && this.props.singleGateway.hideothers === true) {
        this.drawGatewayAlpha(this.singleGateway.gateway)
      } else {
        const listOfAlphas = this.props.visibleGateways.map((gatewayID, _) => this.drawGatewayAlpha(gatewayID))
        return (<FeatureGroup> {listOfAlphas} </FeatureGroup>)
      }
    }
    else {
      return ""
    }
  }
}

const mapStateToProps = state => {
  return {   
    singleGateway: null,
    visibleGateways: state.mapDetails.visibleGateways,
    gatewayAlphaShapes: state.mapDetails.gatewayAlphaShapes,
    currentZoom: state.mapDetails.currentPosition.zoom,
    gatewayDetails: state.mapDetails.gatewayDetails,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps
})

const AlphaCoverage = connect(mapStateToProps, mapDispatchToProps)(_AlphaCoverage)

export default AlphaCoverage;
export { _AlphaCoverage };
