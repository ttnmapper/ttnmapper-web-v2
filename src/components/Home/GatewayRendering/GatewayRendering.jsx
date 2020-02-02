import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popup, Marker } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import PropTypes from 'prop-types';

// Workaround for leaflet css?
import L from 'leaflet';
import 'react-leaflet-markercluster/dist/styles.min.css'
//import { list } from 'postcss';

import Spiderfy from '../Spiderfy/Spiderfy'

// The icons' graphics files should always be the same dimension
const icoSize = [20,20];
const icoAnchor = [10, 10];
const icoPopupAnchor = [10, 10];

const gwMarkerIconRoundBlue = L.icon({
  iconUrl: require("./images/gateway_dot.png"),
  iconSize: icoSize,
  iconAnchor: icoAnchor,
  popupAnchor: icoPopupAnchor
});
const gwMarkerIconRoundGreen = L.icon({
  iconUrl: require("./images/gateway_dot_green.png"),
  iconSize: icoSize,
  iconAnchor: icoAnchor,
  popupAnchor: icoPopupAnchor
});
const gwMarkerIconRoundRed = L.icon({
  iconUrl: require("./images/gateway_dot_red.png"),
  iconSize: icoSize,
  iconAnchor: icoAnchor,
  popupAnchor: icoPopupAnchor
});
const gwMarkerIconRoundYellow = L.icon({
  iconUrl: require("./images/gateway_dot_yellow.png"),
  iconSize: icoSize,
  iconAnchor: icoAnchor,
  popupAnchor: icoPopupAnchor
});

/*
  A leaflet map layer to render the gateway icons and their pop-up icons
*/
class _GatewayRendering extends Component {

  constructor(props) {
    super(props)
  }

  /**
   * Return a single gateway marker object, with it's popup description. Will
   * not render if we do not have the gateway details.
   * 
   * @param {gatewayID} The ID of the gateway, this will be looked up in this.props
   * @returns A JSX Marker object
   */
  drawSingleMarker(gatewayID) {
    const {gatewayDetails} = this.props

    if (gatewayID in gatewayDetails) {

      const gwDetails = gatewayDetails[gatewayID]
      // Optional section displays extra info, if the gateway should be 
      // removed or single channel
      let optionalSection = ""
      let icon = gwMarkerIconRoundBlue

      // Fill out the optional sections, and possibly change the icons
      if (gwDetails.last_heard < (Date.now() / 1000) - (60 * 60 * 1)) {
        optionalSection = (
          <div>
            <br />
            <font color="red">Offline.</font>
            Will be removed from the map in 5 days.
            <br />
          </div>
        )
        icon = gwMarkerIconRoundRed
      } else if (gwDetails.channels < 3) {
        optionalSection = (
          <div>
            <br />
            Likely a 
            <font color="orange"> Single Channel Gateway.</font>
            <br />
          </div>
        )
        icon = gwMarkerIconRoundYellow
      }

      return (
        <Marker position={[gwDetails.lat, gwDetails.lon]} key={"marker_" + gatewayID} icon={icon}>
          <Popup offset={[-11,0]}>
            <b>{('description' in gwDetails ? gwDetails.description : gwDetails.gwaddr)}</b>
            <br />
            {gatewayID}
            <br />
            {optionalSection}
            <br />
            Last heard at 
            {gwDetails.last_heard}
            <br />
            Channels heard on: 
            {gwDetails.channels}
          </Popup>
        </Marker>
      )
    }
    return ""
  }

  /**
   * Main render function.
   */
  render() {
    const {visibleGateways, singleGateway, currentZoom} = this.props

    if (visibleGateways) {
      if (singleGateway && singleGateway.hideothers === true) {
        return this.drawSingleMarker(singleGateway.gateway)
      } else {
        const listOfMarkers = visibleGateways.map((gatewayID) => this.drawSingleMarker(gatewayID))

        if (currentZoom < 9) {
          // If we are zoommed out, just cluster the markers.
          return (
            <MarkerClusterGroup showCoverageOnHover={false}>
              { listOfMarkers }
            </MarkerClusterGroup>
          )
        }
        else {
          // Otherwise spiderfy them, so an individual one can be selected
          return (
            <Spiderfy>
              { listOfMarkers }
            </Spiderfy>
          )
        }
      }
    }
    else {
      return ""
    }
  }
}

_GatewayRendering.propTypes = {
  singleGateway: PropTypes.object.isRequired,
  visibleGateways: PropTypes.array.isRequired,
  currentZoom: PropTypes.number.isRequired,
  gatewayDetails: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return { 
    singleGateway: {},
    visibleGateways: state.mapDetails.visibleGateways,
    currentZoom: state.mapDetails.currentPosition.zoom,
    gatewayDetails: state.mapDetails.gatewayDetails
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps
})

const GatewayRendering = connect(mapStateToProps, mapDispatchToProps)(_GatewayRendering)

export default GatewayRendering;
export { _GatewayRendering, gwMarkerIconRoundBlue };
