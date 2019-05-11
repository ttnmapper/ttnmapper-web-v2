// Render the circle coverage
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { FeatureGroup, GeoJSON } from 'react-leaflet'

class _CircleCoverage extends Component {

    constructor(props) {
        super(props)
    }

    drawGatewayCircles(listOfVisibleGateways) {
        if (listOfVisibleGateways) {
          const listOfCircles = listOfVisibleGateways.map((gatewayID, index) => {
            if (gatewayID in this.props.mapDetails.gatewayCircleCover) {
              return <GeoJSON key={"circle_cover_" + gatewayID} data={this.props.mapDetails.gatewayCircleCover[gatewayID]} pointToLayer={this.pointToLayer.bind(this)} />
            }
          })
          console.log(this.props.mapDetails.gatewayCircleCover)
          return listOfCircles
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

    render() {
        console.log("Rendering CircleCoverage")
        return (<FeatureGroup> {this.drawGatewayCircles(this.props.mapDetails.visibleGateways)} </FeatureGroup>)
    }
}

const mapStateToProps = state => {
    return {
      mapDetails: state.mapDetails,
    }
  }
  
  const mapDispatchToProps = (dispatch, ownProps) => ({
    ...ownProps
  })

const CircleCoverage = connect(mapStateToProps, mapDispatchToProps)(_CircleCoverage)

export default CircleCoverage;
export { _CircleCoverage };