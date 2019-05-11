// Render the radar coverage
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FeatureGroup, GeoJSON } from 'react-leaflet'


const radarStyle = {
  stroke: false,
  fillOpacity: 0.25,
  fillColor: "#0000FF",
  zIndex: 25
}

/*
  Render multiple or individual radar coverage patterns.

  A radar coverage is a circle divided into 360 segments, and each segment
  indicates the furthest package that was received in that direction. The
  circle data is received as a GeoJSON
*/
class _RadarCoverage extends Component {


  constructor(props) {
      super(props)
  }

  drawGatewayRadar(gatewayID) {
    if (gatewayID in this.props.gatewayRadarCover) {
      const key = "radar_cover_" + gatewayID
      const data = this.props.gatewayRadarCover[gatewayID]
      return <GeoJSON key={key} data={data} style={radarStyle} />
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
        this.drawGatewayRadar(this.singleGateway.gateway)
      } else {
        const listOfRadars = this.props.visibleGateways.map((gatewayID, _) => this.drawGatewayRadar(gatewayID))
        return (<FeatureGroup> {listOfRadars} </FeatureGroup>)
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
    gatewayRadarCover: state.mapDetails.gatewayRadarCover,
    currentZoom: state.mapDetails.currentPosition.zoom,
    gatewayDetails: state.mapDetails.gatewayDetails,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps
})

const RadarCoverage = connect(mapStateToProps, mapDispatchToProps)(_RadarCoverage)

export default RadarCoverage;
export { _RadarCoverage };