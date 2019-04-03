import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map, TileLayer, LayersControl } from 'react-leaflet'
const { BaseLayer } = LayersControl

import { updateMapPosition, fetchNewMapData } from '../../actions/map-events'
import GatewayRendering from './GatewayRendering/GatewayRendering'
import PacketRendering from './PacketRendering/PacketRendering'
import AlertPopup from '../AlertPopup'
import { parseQuery } from './query-utils'

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
      this.params = parseQuery(props.location.search)
    } else {
      this.params = {}
    }

    if ('lat' in this.params && 'long' in this.params && 'zoom' in this.params) {
        this.copiedCoords.lat = this.params.lat
        this.copiedCoords.long = this.params.long
        this.copiedCoords.zoom = this.params.zoom
    }

    this.rendermode = 'coverage'
    this.packetsSettings = null
    // packets mdoe will also have deviceID, date_from and date_to
    if ('mode' in this.params && this.params.mode === 'packets') {
      if ('deviceID' in this.params && 'fromDate' in this.params && 'toDate' in this.params) {
        this.rendermode = 'packets'
        this.packetsSettings = {
          deviceID: this.params.deviceID,
          fromDate: this.params.fromDate,
          toDate: this.params.toDate
        }
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

    this.props.updateMapPosition(newCoords, this.props.location.search)

    if (this.rendermode === "coverage") {
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
      ),
      (
        <BaseLayer key="opentopomap" name="OpenTopo Map">
          <TileLayer
            attribution='Map Data: © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende, SRTM | Map display: © <a href="http://opentopomap.org/">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            url="https://b.tile.opentopomap.org/{z}/{x}/{y}.png"
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
        <Map center={position} zoom={zoom} onMoveend={this.mapMovedEventHandler} zoomend={this.mapMovedEventHandler} ref={(ref) => { this.map = ref; }} maxZoom={18} minZoom={2} >
          <LayersControl position="topright">
            {this.addBaseTileLayers()}
          </LayersControl>
          <GatewayRendering rendermode={this.rendermode} />
          <PacketRendering requestedPackets={this.packetsSettings}/>
        </Map>
        <AlertPopup />
      </div>
    )
  }

  componentDidMount() {

    if (this.map) {
      const currentExtent = this.map.leafletElement.getBounds()
      if (this.rendermode === "coverage") {
        this.props.fetchNewMapData(currentExtent, this.copiedCoords.zoom, Object.keys(this.props.mapDetails.gatewayDetails))
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    mapDetails: state.mapDetails,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateMapPosition: (newPosition, previousSearch) => dispatch(updateMapPosition(newPosition,previousSearch)),
  fetchNewMapData: (mapExtent, zoomLevel) => dispatch(fetchNewMapData(mapExtent, zoomLevel, [],[],[]))
})

const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)

export default Home;
export { _Home };
