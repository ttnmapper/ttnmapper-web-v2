import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map, TileLayer, LayersControl } from 'react-leaflet'
const { BaseLayer } = LayersControl

import { parseCoordsFromQuery } from './query-utils'
import { updateMapPosition, fetchNewMapData } from '../../actions/map-events'
import GatewayRendering from './GatewayRendering/GatewayRendering'
import AlertPopup from '../AlertPopup'

import 'leaflet/dist/leaflet.css';
import './home.css'

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

  mapMovedEventHandler(event) {
    // Dispatch an action handler to update the state
    let coordsFromMap = event.target.getBounds().getCenter()
    const newCoords = {
      lat: coordsFromMap.lat,
      long: coordsFromMap.lng,
      zoom: event.target.getZoom()
    }
    this.props.updateMapPosition(newCoords, {other: "abcdef"})

    if (this.map) {
      const currentExtent = this.map.leafletElement.getBounds()
      const currentZoom = newCoords.zoom
      this.props.fetchNewMapData(currentExtent,
        currentZoom,
        Object.keys(this.props.mapDetails.gatewayDetails),
        Object.keys(this.props.mapDetails.gatewayCircleCover),
        Object.keys(this.props.mapDetails.gatewayRadarCover))
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
          <GatewayRendering />
        </Map>
        <AlertPopup />
      </div>
    )
  }

  componentDidMount() {

    if (this.map) {
      const currentExtent = this.map.leafletElement.getBounds()
      this.props.fetchNewMapData(currentExtent, this.copiedCoords.zoom, Object.keys(this.props.mapDetails.gatewayDetails))
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
  fetchNewMapData: (mapExtent, zoomLevel) => dispatch(fetchNewMapData(mapExtent, zoomLevel, [],[],[]))
})

const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)

export default Home;
export { _Home };
