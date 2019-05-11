import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popup, Marker } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import Spiderfy from '../Spiderfy/Spiderfy'


// Workaround for leaflet css?
import L from 'leaflet';
import 'react-leaflet-markercluster/dist/styles.min.css'
import { list } from 'postcss';

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
  A leaflet map layer to render the gateway icons and their pop-ups

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
    if (gatewayID in this.props.mapDetails.gatewayDetails) {

      const gwDetails = this.props.mapDetails.gatewayDetails[gatewayID]
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
            < br />
          </div>
        )
        icon = gwMarkerIconRoundRed
      } else if (gwDetails.channels < 3) {
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
        <Marker position={[gwDetails.lat, gwDetails.lon]} key={"marker_" + gatewayID} icon={icon}>
          <Popup offset={[-11,0]}>
            <b>{('description' in gwDetails ? gwDetails.description : gwDetails.gwaddr)}</b>
            <br />
            {gatewayID}
            <br />
            {optionalSection}
            <br />Last heard at {gwDetails.last_heard}
            <br />Channels heard on: {gwDetails.channels}
          </Popup>
        </Marker>
      )
    }
    return ""
  }

  /*
  drawSingleMode(gatewayID, mode) {
    if (mode === 'radar') {
      return (<div key={'single_gw_' + gatewayID}>
        {this.drawMarkers(this.props.mapDetails.visibleGateways)}
        {this.drawGatewayRadars([gatewayID])}
      </div>
      )
    }
    else if (mode === 'alpha') {
      // Check if we have data
      if (gatewayID in this.props.mapDetails.gatewayAlphaShapes) {
        return (<div key={'single_gw_' + gatewayID}>
          {this.drawMarkers(this.props.mapDetails.visibleGateways)}
          {this.drawGatewayAlpha([gatewayID])}
        </div>)
      }
      else {
        // Fire off event to get the data
        this.props.fetchGWAlphaShape(gatewayID)
        return (<div key={'single_gw_' + gatewayID}>
          {this.drawMarkers(this.props.mapDetails.visibleGateways)}
          </div>)
      }
    }
  }*/

  
    /*
    if (this.props.rendermode === "coverage") {
      // coverage mode can be either all gateways or a single gateway
      if (this.props.mapDetails.renderSingle.length > 0) {
        console.log("Render single")
        // We only need to render a single gateway
        const singleGateways = this.props.mapDetails.renderSingle.map((currElement, index) => {
          return this.drawSingleMode(currElement.gatewayID, currElement.mode)
        })
        return (singleGateways)

      }
      else {
        // Normal mode
        console.log("Render normal")
        
      }
    }*/

    // {this.props.mapDetails.currentPosition.zoom >= 10 && this.drawGatewayRadars(this.props.mapDetails.visibleGateways)}
    // {this.props.mapDetails.currentPosition.zoom < 10 && this.drawGatewayCircles(this.props.mapDetails.visibleGateways)}
  

    // if (this.props.rendermode === 'packets') {
    //   return (<div>
    //     {this.drawMarkers(this.props.mapDetails.visibleGateways)}
    //   </div>)
    // }

  /**
   * Main render function.
   */
  render() {

    if (this.props.visibleGateways) {
      if (this.props.singleGateway && this.props.singleGateway.hideothers === true) {
        return this.drawSingleMarker(this.singleGateway.gateway)
      } else {
        const listOfMarkers = this.props.visibleGateways.map((gatewayID, _) => this.drawSingleMarker(gatewayID))
        if (this.props.currentZoom < 9) {
          // If we are zoommed out, just cluster the markers.
          return (
            <MarkerClusterGroup showCoverageOnHover={false}>
              { listOfMarkers }
            </MarkerClusterGroup>)
        }
        else {
          // Otherwise spiderfy them, so an individual one can be selected
          return (
          <Spiderfy >
            { listOfMarkers }
          </Spiderfy>)
        }
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
    mapDetails: state.mapDetails,
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
