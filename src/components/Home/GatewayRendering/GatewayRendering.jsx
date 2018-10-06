import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popup, Marker, GeoJSON } from 'react-leaflet'

import { parseCoordsFromQuery } from '../query-utils'
import { setSingleGateway, clearSingleGateway, fetchGatewayAlphaShape } from '../../../actions/map-events'

// Workaround for leaflet css?
import L from 'leaflet';
import { fetchGWAlphaShape } from '../../../api-calls';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const gwMarkerIconRoundBlue = L.icon({
  iconUrl: require("./images/gateway_dot.png"),
  iconSize: [20, 20], // size of the icon
  iconAnchor: [10, 10], // point of the icon which will correspond to marker\'s location
  popupAnchor: [10, 10] // point from which the popup should open relative to the iconAnchor
});
const gwMarkerIconRoundGreen = L.icon({
  iconUrl: require("./images/gateway_dot_green.png"),
  iconSize: [20, 20], // size of the icon
  iconAnchor: [10, 10], // point of the icon which will correspond to marker\'s location
  popupAnchor: [10, 10] // point from which the popup should open relative to the iconAnchor
});
const gwMarkerIconRoundRed = L.icon({
  iconUrl: require("./images/gateway_dot_red.png"),
  iconSize: [20, 20], // size of the icon
  iconAnchor: [10, 10], // point of the icon which will correspond to marker\'s location
  popupAnchor: [10, 10] // point from which the popup should open relative to the iconAnchor
});
const gwMarkerIconRoundYellow = L.icon({
  iconUrl: require("./images/gateway_dot_yellow.png"),
  iconSize: [20, 20], // size of the icon
  iconAnchor: [10, 10], // point of the icon which will correspond to marker\'s location
  popupAnchor: [10, 10] // point from which the popup should open relative to the iconAnchor
});

class _GatewayRendering extends Component {

  constructor(props) {
    super(props)

    this.singleGateway = null
    if ('location' in props) {
      const singleGateway = parseCoordsFromQuery(props.location.search)
      console.log("Single gateway mode!")
      console.log(singleGateway)

      if (singleGateway.gateway !== null && singleGateway.type !== null) {
        this.singleGateway = singleGateway
      }
    }
  }

  drawSingleMarker(gatewayID) {
    if (gatewayID in this.props.mapDetails.gatewayDetails) {
      const details = this.props.mapDetails.gatewayDetails[gatewayID]
      let optionalSection = ""
      let icon = gwMarkerIconRoundBlue

      if (details.last_heard < (Date.now() / 1000) - (60 * 60 * 1)) {
        optionalSection = (
          <div>
            <br />
            <font color="red">Offline.</font>
            Will be removed from the map in 5 days.
            < br />
          </div>
        )
        icon = gwMarkerIconRoundRed
      } else if (details.channels < 3) {
        optionalSection = (
          <div>
            <br />
            Likely a < font color="orange" > Single Channel Gateway.</font >
            <br />
          </div>
        )
        icon = gwMarkerIconRoundYellow
      }

      return (
        <Marker position={[details.lat, details.lon]} key={"marker_" + gatewayID} icon={icon}>
          <Popup offset={[-11,0]}>
            <b>{('description' in details ? details.description : details.gwaddr)}</b>
            <br />
            {details.gwaddr}
            <br />
            {optionalSection}
            <br />Last heard at {details.last_heard}
            <br />Channels heard on: {details.channels}
            <br />Show only this gateway's coverage as:
            <br />
            <ul>
              <li><a href="#" onClick={this.props.setSingleGateway.bind(this, gatewayID, 'radar')}>radar</a></li>
              <li><a href="#" onClick={this.props.setSingleGateway.bind(this, gatewayID, 'alpha')}>alpha</a></li>
              <li><a href="#" onClick={this.props.clearSingleGateway.bind(this)}>clear</a></li>
            </ul>
          </Popup>
        </Marker>
      )
    }
    return ""
  }

  /**
   * Draw the markers. This assues the zoom level checking was already done
   *
   * This function returns a list of <Marker> components, that can be inserted into
   * the map component
   */
  drawMarkers(listOfVisibleGateways) {

    if (listOfVisibleGateways) {
      if (this.singleGateway && this.singleGateway.hideothers === true) {
        return this.drawSingleMarker(this.singleGateway.gateway)
      } else {
        const listOfMarkers = listOfVisibleGateways.map((gatewayID, index) => this.drawSingleMarker(gatewayID))
        return listOfMarkers
      }
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
   * Draw rough coverage circles, for use with quite large zoom levels. Zoom level check done somewhere else.
   *
   * This function returns a list of <GeoJSON> components, that can be inserted into
   * the map component
   */
  drawGatewayCircles(listOfVisibleGateways) {
    if (listOfVisibleGateways) {
      const listOfCircles = listOfVisibleGateways.map((gatewayID, index) => {
        if (gatewayID in this.props.mapDetails.gatewayCircleCover) {
          return <GeoJSON key={"circle_cover_" + gatewayID} data={this.props.mapDetails.gatewayCircleCover[gatewayID]} pointToLayer={this.pointToLayer.bind(this)} />
        }
      })
      return listOfCircles
    }
  }

  /**
   * Draw the radars for a list of gateways. Zoom level check done somewhere else.
   *
   * This function returns a list of <GeoJSON> components, that can be inserted into
   * the map component
   */
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
  }

  /**
   * Draw the alpha shape for a list of gateways
   *
   * This function returns a list of <GeoJSON> components, that can be inserted into
   * the map component
   */
  drawGatewayAlpha(listOfVisibleGateways) {
    const alphaStyle = {
      stroke: false,
      fillOpacity: 0.25,
      fillColor: "#0000FF",
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
  }

  render() {
    if (this.props.mapDetails.renderSingle) {
      // We only need to render a single gateway
      const gatewayID = this.props.mapDetails.renderSingle.gatewayID;
      if (this.props.mapDetails.renderSingle.mode === 'radar') {
        return (<div>
          {this.drawMarkers(this.props.mapDetails.visibleGateways)}
          {this.drawGatewayRadars([gatewayID])}
        </div>
        )
      }
      else if (this.props.mapDetails.renderSingle.mode === 'alpha') {
        // Check if we have data
        if (gatewayID in this.props.mapDetails.gatewayAlphaShapes) {
          return (<div>
            {this.drawMarkers(this.props.mapDetails.visibleGateways)}
            {this.drawGatewayAlpha([gatewayID])}
          </div>)
        }
        else {
          // Fire off event to get the data
          this.props.fetchGWAlphaShape(gatewayID)
          return (<div>
            {this.drawMarkers(this.props.mapDetails.visibleGateways)}
            </div>)
        }
      }
    }
    // No in single mode
    return (<div>
      {this.drawMarkers(this.props.mapDetails.visibleGateways)}
      {this.props.mapDetails.currentPosition.zoom >= 10 && this.drawGatewayRadars(this.props.mapDetails.visibleGateways)}
      {this.props.mapDetails.currentPosition.zoom < 10 && this.drawGatewayCircles(this.props.mapDetails.visibleGateways)}
    </div>)
  }
}

const mapStateToProps = state => {
  return {
    mapDetails: state.mapDetails,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  setSingleGateway: (gatewayID, mode) => dispatch(setSingleGateway(gatewayID, mode)),
  clearSingleGateway: () => dispatch(clearSingleGateway()),
  fetchGWAlphaShape: (gatewayID) => dispatch(fetchGatewayAlphaShape(gatewayID)),
})

const GatewayRendering = connect(mapStateToProps, mapDispatchToProps)(_GatewayRendering)

export default GatewayRendering;
export { _GatewayRendering };
