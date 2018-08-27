import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map, Popup, TileLayer, Marker, LayersControl } from 'react-leaflet'
const { BaseLayer } = LayersControl

import { parseCoordsFromQuery } from './query-utils'
import { updateMapPosition, fetchNewMapData } from '../../actions/map-events'

import 'leaflet/dist/leaflet.css';
import './home.css'

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

class _Home extends Component {

  constructor(props) {
    super(props)

    this.mapMovedEventHandler = this.mapMovedEventHandler.bind(this)
    /*
    Bit of trickery here: When the map is created it gets coordinates, but is never re-rendered.
    Then the map is move the event listener gets coordinates which don't exactly match.
    We need to store the coords for the url or if the map is re-visited. So: Copy the coords when
    first mounted, and hope they stay in sync.
    */
    this.copiedCoords = this.props.mapDetails.currentPosition

    if ('location' in props && 'search' in props.location && props.location.search !== "") {
      const parsedCoords = parseCoordsFromQuery(props.location.search)

      // Verify all the arguments were given, otherwise, just use previous position
      if (parsedCoords.lat !== null && parsedCoords.long !== null && parsedCoords.zoom !== null) {
        this.copiedCoords = parsedCoords
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

  drawGatewayCircles() {
    return []
  }

  drawGatewayRadars() {
    return []
  }

  mapMovedEventHandler(event) {
    // Dispatch an action handler to update the state
    let coordsFromMap = event.target.getBounds().getCenter()
    const newCoords = {
      lat: coordsFromMap.lat,
      long: coordsFromMap.lng,
      zoom: event.target.getZoom()
    }
    this.props.updateMapPosition(newCoords)

    if (this.map) {
      const currentExtent = this.map.leafletElement.getBounds()
      this.props.fetchNewMapData(currentExtent, {}, Object.keys(this.props.mapDetails.gatewayDetails))
    }
  }

  addBaseTileLayers() {
    return [
      (
        <BaseLayer key="stamenTonerLiteLayer" checked name="Stamen TonerLite">
          <TileLayer
            attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}"
            subdomains="abcd"
            ext='png'
            minZoom="0"
            maxZoom="20"
            fadeAnimation={false}
          />
        </BaseLayer>
      ),
      (
        <BaseLayer key="osmMapnikLayer" name="OSM Mapnik">
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            maxZoom="19"
            fadeAnimation={false}
          />
        </BaseLayer>
      ),
      (
        <BaseLayer key="osmMapnikGreyscaleLayer" name="OSM Mapnik Grayscale">
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            maxZoom="19"
            fadeAnimation={false}
          />
        </BaseLayer>
      ),
      (
        <BaseLayer key="terrainLayer" name="Terrain">
          <TileLayer
            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}'
            attribution='Tiles &copy; Esri &mdash; Source: Esri'
            maxZoom="13"
            fadeAnimation={false}
          />
        </BaseLayer>
      ),
      (
        <BaseLayer key="esriWorldImageryLayer" name="Satellite">
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            fadeAnimation={false}
          />
        </BaseLayer>
      )
    ]
  }

  render() {
    const zoom = this.copiedCoords.zoom
    const position = [this.copiedCoords.lat, this.copiedCoords.long]

    return (
      <div id="mapsContainer" >
        <Map center={position} zoom={zoom} onMoveend={this.mapMovedEventHandler} zoomend={this.mapMovedEventHandler} ref={(ref) => { this.map = ref; }}>
          <LayersControl position="topright">
            {this.addBaseTileLayers()}
          </LayersControl>
          {this.drawMarkersAboveZoom(this.props.mapDetails.visibleGateways) }
        </Map>
      </div>
    )
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
  updateMapPosition: (newPosition) => dispatch(updateMapPosition(newPosition)),
  fetchNewMapData: (mapExtent, _, knownGateways) => dispatch(fetchNewMapData(mapExtent, {}, knownGateways))
})

const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)

export default Home;
export { _Home };
