/*
  A Leaflet map layer which renders multiple or individual gateway coverage.

  The alpha coverage is a geometric shape which tries to approximate the area
  in which a gateway has coverage. These are calculated on the backend, and 
  sent to the front end as a geojson string.
*/

import { Component } from 'react'
import { connect } from 'react-redux'

class _AlphaCoverage extends Component {
    render() {
        return null
    }

    /**
   * Draw the alpha shape for a list of gateways
   *
   * This function returns a list of <GeoJSON> components, that can be inserted into
   * the map component
   */
  /*
  drawGatewayAlpha(listOfVisibleGateways) {
    const alphaStyle = {
      stroke: false,
      fillOpacity: 0.25,
      fillColor: "#37d699",
      zIndex: 25
    }
    if (listOfVisibleGateways) {
      const listOfAlphaCover = listOfVisibleGateways.map((gatewayID, index) => {
        if (gatewayID in this.props.mapDetails.gatewayAlphaShapes) {

          return <GeoJSON key={"alpha_cover_" + gatewayID} data={this.props.mapDetails.gatewayAlphaShapes[gatewayID]} style={alphaStyle} />
        }
      })
      return listOfAlphaCover
    }
  }*/
}

const mapStateToProps = state => {
    return {}
  }

const AlphaCoverage = connect(mapStateToProps)(_AlphaCoverage)

export default AlphaCoverage;
export { _AlphaCoverage };