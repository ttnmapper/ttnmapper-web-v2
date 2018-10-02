import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popup, Marker, GeoJSON } from 'react-leaflet'

import { fetchNewMapData } from '../../../actions/map-events'

// Workaround for leaflet css?
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const gwMarkerIconRoundBlue = L.icon({
  iconUrl: require("./images/gateway_dot.png"),
  iconSize:     [20, 20], // size of the icon
  iconAnchor:   [10, 10], // point of the icon which will correspond to marker\'s location
  popupAnchor:  [10, 10] // point from which the popup should open relative to the iconAnchor
});
const gwMarkerIconRoundGreen = L.icon({
  iconUrl: require("./images/gateway_dot_green.png"),
  iconSize:     [20, 20], // size of the icon
  iconAnchor:   [10, 10], // point of the icon which will correspond to marker\'s location
  popupAnchor:  [10, 10] // point from which the popup should open relative to the iconAnchor
});
const gwMarkerIconRoundRed = L.icon({
  iconUrl: require("./images/gateway_dot_red.png"),
  iconSize:     [20, 20], // size of the icon
  iconAnchor:   [10, 10], // point of the icon which will correspond to marker\'s location
  popupAnchor:  [10, 10] // point from which the popup should open relative to the iconAnchor
});
const gwMarkerIconRoundYellow = L.icon({
  iconUrl: require("./images/gateway_dot_yellow.png"),
  iconSize:     [20, 20], // size of the icon
  iconAnchor:   [10, 10], // point of the icon which will correspond to marker\'s location
  popupAnchor:  [10, 10] // point from which the popup should open relative to the iconAnchor
});

class _GatewayRendering extends Component {

  constructor(props) {
    super(props)


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
        icon=gwMarkerIconRoundYellow
      }

      return (
        <Marker position={[details.lat, details.lon]} key={"marker_" + gatewayID} icon={icon}>
          <Popup>
            <b>{('description' in details ? details.description : details.gwaddr)}</b>
            <br />
            { details.gwaddr }
            <br />
            {optionalSection}
            <br />Last heard at {details.last_heard}
            <br />Channels heard on: {details.channels}
            <br />Show only this gateway's coverage as:
            <br />
            <ul>
              <li><a href="#">radar</a></li>
              <li><a href="#">alpha shape</a></li>
            </ul>
          </Popup>
        </Marker>
      )
    }
    return ""
  }

  /**
   * Above zoomThreshold1 only draw the markers of all gateways in view.
   *
   * This function returns a list of <Marker> components, that can be inserted into
   * the map component
   */
  drawMarkersAboveZoom(listOfVisibleGateways) {

    if (listOfVisibleGateways) {
      const listOfMarkers = listOfVisibleGateways.map((gatewayID, index) => this.drawSingleMarker(gatewayID))
      return listOfMarkers
    }
    else {
      return ""
    }
  }

  drawGatewayRadars(listOfVisibleGateways) {
    if (this.props.mapDetails.currentPosition.zoom < 10) {
      return ""
    }
    const radarStyle = {
      stroke: false,
      fillOpacity: 0.25,
      fillColor: "#0000FF",
      zIndex: 25
    }
    if (listOfVisibleGateways) {
      const listOfRadarCover = listOfVisibleGateways.map((gatewayID, index) => {
        if (gatewayID in this.props.mapDetails.gatewayRadarCover) {

          return <GeoJSON key={"radar_cover_"+gatewayID} data={this.props.mapDetails.gatewayRadarCover[gatewayID]} style={radarStyle}/>
        }
        else {
          return ""
        }
      })
      return listOfRadarCover
    }
    return ""
  }

  pointToLayer(feature, latlng){
    return L.circle(latlng, feature.properties.radius, {
      stroke: false,
      color: feature.style.color,
      fillColor: feature.style.color,
      fillOpacity: 0.25
    })
  }

  drawGatewayCircles(listOfVisibleGateways) {
    if (this.props.mapDetails.currentPosition.zoom >= 10) {
      return ""
    }
    const circleStyle = {
      stroke: false,
      fillOpacity: 0.25,
      fillColor: "#0000FF",
      zIndex: 25
    }

    if (listOfVisibleGateways) {
      const listOfCircles = listOfVisibleGateways.map((gatewayID, index) => {
        if (gatewayID in this.props.mapDetails.gatewayCircleCover) {
          return <GeoJSON key={"circle_cover_"+gatewayID} data={this.props.mapDetails.gatewayCircleCover[gatewayID]} pointToLayer={this.pointToLayer.bind(this)}/>
        }
        else {
          return ""
        }
      })
      return listOfCircles
    }
    return ""
  }

  render() {
    return ( <div>
      { this.drawMarkersAboveZoom(Object.keys(this.props.mapDetails.gatewayDetails)) }
      { this.drawGatewayRadars(Object.keys(this.props.mapDetails.gatewayDetails))}
      { this.drawGatewayCircles(Object.keys(this.props.mapDetails.gatewayDetails))}
      </div>)
  }

  componentDidMount() {
    if (this.map) {
      const currentExtent = this.map.leafletElement.getBounds()
      this.props.fetchNewMapData(currentExtent, {}, Object.keys(this.props.mapDetails.gatewayDetails))
    }
  }
}

const mapStateToProps = state => {
  return {
    mapDetails: state.mapDetails,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchNewMapData: (mapExtent, _, knownGateways) => dispatch(fetchNewMapData(mapExtent, {}, knownGateways))
})

const GatewayRendering = connect(mapStateToProps, mapDispatchToProps)(_GatewayRendering)

export default GatewayRendering;
export { _GatewayRendering };
