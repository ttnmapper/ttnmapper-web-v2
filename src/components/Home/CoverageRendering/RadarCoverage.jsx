// Render the radar coverage
import React, { Component } from 'react'
import { connect } from 'react-redux'

class _RadarCoverage extends Component {

      /**
   * Draw the radars for a list of gateways. Zoom level check done somewhere else.
   *
   * This function returns a list of <GeoJSON> components, that can be inserted into
   * the map component
   */
  /*
  drawGatewayRadars(listOfVisibleGateways) {
    const radarStyle = {
      stroke: false,
      fillOpacity: 0.25,
      fillColor: "#0000FF",
      zIndex: 25
    }
    if (listOfVisibleGateways) {
      const listOfRadarCover = listOfVisibleGateways.map((gatewayID, index) => {
        if (gatewayID in this.props.mapDetails.gatewayRadarCover) {

          return <GeoJSON key={"radar_cover_" + gatewayID} data={this.props.mapDetails.gatewayRadarCover[gatewayID]} style={radarStyle} />
        }
      })
      return listOfRadarCover
    }
  }*/
  
    render() {
        return null
    }
}

const mapStateToProps = state => {
    return {}
  }

const RadarCoverage = connect(mapStateToProps)(_RadarCoverage)

export default RadarCoverage;
export { _RadarCoverage };