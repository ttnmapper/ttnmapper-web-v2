
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FeatureGroup, GeoJSON } from 'react-leaflet'

/*
  A Leaflet map layer which renders multiple or individual gateway coverage.

  The circle coverage is just a circle drawn to the furthest packet received
  This is a poor estimate of the coverage, but very fast from a rendering side.
  They are rendered transparent blue. 
*/
class _CircleCoverage extends Component {

    constructor(props) {
        super(props)
    }

    drawGatewayCircle(gatewayID) {
      if (gatewayID in this.props.gatewayCircleCover) {
        const key = "circle_cover_" + gatewayID
        const data = this.props.gatewayCircleCover[gatewayID]
        const pointFunction = this.pointToLayer.bind(this)
        return <GeoJSON key={key} data={data} pointToLayer={pointFunction} />
      }
      else {
          return ""
        }
      }

    /**
     * Helper function for gateway circles
     */
    pointToLayer(feature, latlng) {
        return L.circle(latlng, feature.properties.radius, {
            stroke: false,
            color: feature.style.color,
            fillColor: feature.style.color,
            fillOpacity: 0.25
        })
    }

    /**
     * React render function
     */
    render() {
      if (this.props.visibleGateways) {
        if (this.props.singleGateway && this.props.singleGateway.hideothers === true) {
          this.drawGatewayCircle(this.singleGateway.gateway)
        } else {
          const listOfCircles = this.props.visibleGateways.map((gatewayID, _) => this.drawGatewayCircle(gatewayID))
          return (<FeatureGroup> {listOfCircles} </FeatureGroup>)
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
      gatewayCircleCover: state.mapDetails.gatewayCircleCover,
      currentZoom: state.mapDetails.currentPosition.zoom,
      gatewayDetails: state.mapDetails.gatewayDetails,
    }
  }
  
  const mapDispatchToProps = (dispatch, ownProps) => ({
    ...ownProps
  })

const CircleCoverage = connect(mapStateToProps, mapDispatchToProps)(_CircleCoverage)

export default CircleCoverage;
export { _CircleCoverage };