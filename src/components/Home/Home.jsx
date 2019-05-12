import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map, TileLayer, LayersControl, FeatureGroup } from 'react-leaflet'
import PropTypes from 'prop-types';

import { updateMapPosition, fetchNewMapData } from '../../actions/map-events'
import GatewayRendering from './GatewayRendering/GatewayRendering'
import AlertPopup from '../AlertPopup'
import { parseQuery } from './query-utils'
import AlphaCoverage from './CoverageRendering/AlphaCoverage'
import CircleCoverage from './CoverageRendering/CircleCoverage'
import RadarCoverage from './CoverageRendering/RadarCoverage'

import 'leaflet/dist/leaflet.css'
import './home.css';

/** 
 * This is the main map component. It renders maps with different coverage settings.
 */

class _Home extends Component {
  constructor(props) {
    super(props)

    const {mapDetails, location} = this.props;

    this.mapMovedEventHandler = this.mapMovedEventHandler.bind(this)
    /*
    Bit of trickery here: When the map is created it gets coordinates, but is never re-rendered.
    Then the map is move the event listener gets coordinates which don't exactly match.
    We need to store the coords for the url or if the map is re-visited. So: Copy the coords when
    first mounted, and hope they stay in sync.
    */
    this.copiedCoords = mapDetails.currentPosition

    if ('search' in location && location.search !== "") {
      this.params = parseQuery(location.search)
    } else {
      this.params = {}
    }

    if ('lat' in this.params && 'long' in this.params && 'zoom' in this.params) {
      this.copiedCoords.lat = this.params.lat
      this.copiedCoords.long = this.params.long
      this.copiedCoords.zoom = this.params.zoom
    }

    // Rendermode was a URL parameter indicating how to show the map. Coverage
    // is circle/radar/alpha mode, packets shows individaul packets for a 
    // device.
    this.rendermode = 'coverage'
    this.packetsSettings = null

    // packets mode will also have deviceID, date_from and date_to
    if ('mode' in this.params && this.params.mode === 'packets') {
      if ('deviceID' in this.params && 'fromDate' in this.params && 'toDate' in this.params) {
        this.rendermode = 'packets'
        this.packetsSettings = {
          deviceID: this.params.deviceID,
          fromDate: this.params.fromDate,
          toDate: this.params.toDate
        }
      }
      if ('deviceID' in this.params && 'date' in this.params) {
        this.rendermode = 'packets'
        this.packetsSettings = {
          deviceID: this.params.deviceID,
          date: this.params.date
        }
      }
    }
  }

  componentDidMount() {
    const {fetchNewMapData, mapDetails} = this.props

    // Once the map is mounted, make sure we have data for all the devices.
    if (this.map) {
      const currentExtent = this.map.leafletElement.getBounds()
      if (this.rendermode === "coverage") {
        fetchNewMapData(currentExtent, this.copiedCoords.zoom, 
          Object.keys(mapDetails.gatewayDetails), 
          Object.keys(mapDetails.gatewayCircleCover),
          Object.keys(mapDetails.gatewayRadarCover),
          Object.keys(mapDetails.gatewayAlphaShapes)
        )
      }
    }
  }

  /**
   * Helper function for creating the map. Returns a list of leaflet Layers
   */
  addBaseTileLayers() {
    return [
      (
        <LayersControl.BaseLayer key="stamenTonerLiteLayer" checked name="Stamen TonerLite">
          <TileLayer
            attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}"
            subdomains="abcd"
            ext='png'
            minZoom="0"
            maxZoom="20"
            fadeAnimation={false}
          />
        </LayersControl.BaseLayer>
      ),
      (
        <LayersControl.BaseLayer key="osmMapnikLayer" name="OSM Mapnik">
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            maxZoom="19"
            fadeAnimation={false}
          />
        </LayersControl.BaseLayer>
      ),
      (
        <LayersControl.BaseLayer key="terrainLayer" name="Terrain">
          <TileLayer
            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}'
            attribution='Tiles &copy; Esri &mdash; Source: Esri'
            maxZoom="13"
            fadeAnimation={false}
          />
        </LayersControl.BaseLayer>
      ),
      (
        <LayersControl.BaseLayer key="esriWorldImageryLayer" name="Satellite">
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            fadeAnimation={false}
          />
        </LayersControl.BaseLayer>
      ),
      (
        <LayersControl.BaseLayer key="opentopomap" name="OpenTopo Map">
          <TileLayer
            attribution='Map Data: © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende, SRTM | Map display: © <a href="http://opentopomap.org/">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            url="https://b.tile.opentopomap.org/{z}/{x}/{y}.png"
            fadeAnimation={false}
          />
        </LayersControl.BaseLayer>
      )
    ]
  }

  /**
   *  Handler for the leaflet map. Check for gateways when the map is moved.
   */
  mapMovedEventHandler(event) {
    const {updateMapPosition, fetchNewMapData, location, mapDetails} = this.props

    // Dispatch an event to update the state
    let coordsFromMap = event.target.getBounds().getCenter()
    const newCoords = {
      lat: coordsFromMap.lat,
      long: coordsFromMap.lng,
      zoom: event.target.getZoom()
    }

    updateMapPosition(newCoords, location.search)

    // Dispatch an event to check and get possible new data
    if (this.rendermode === "coverage") {
      if (this.map) {
        const currentExtent = this.map.leafletElement.getBounds()
        const currentZoom = newCoords.zoom
        fetchNewMapData(currentExtent,
          currentZoom,
          Object.keys(mapDetails.gatewayDetails),
          Object.keys(mapDetails.gatewayCircleCover),
          Object.keys(mapDetails.gatewayRadarCover))
      }
    }
  }

  render() {
    const zoom = this.copiedCoords.zoom
    const position = [this.copiedCoords.lat, this.copiedCoords.long]

    let Gateways = (<GatewayRendering rendermode={this.rendermode} />)

    return (
      <div id="mapsContainer">
        <Map center={position} zoom={zoom} onMoveend={this.mapMovedEventHandler} zoomend={this.mapMovedEventHandler} ref={(ref) => { this.map = ref; }} maxZoom={18} minZoom={2}>
          <LayersControl position="topright" collapsed={false}>
            {this.addBaseTileLayers()}
          </LayersControl>
          <LayersControl position="topright" collapsed={false}>
            <LayersControl.BaseLayer name='No Coverage'>
              <FeatureGroup />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name='Circle Coverage'>
              <CircleCoverage />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name='Alpha Shapes'>
              <AlphaCoverage />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name='Radar Coverage'>
              <RadarCoverage />
            </LayersControl.BaseLayer>
          </LayersControl>
          { Gateways }
        </Map>
        <AlertPopup />
      </div>
    )
  }

}

_Home.propTypes = {
  mapDetails: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  updateMapPosition: PropTypes.func.isRequired,
  fetchNewMapData: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    mapDetails: state.mapDetails,
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateMapPosition: (newPosition, previousSearch) => dispatch(updateMapPosition(newPosition,previousSearch)),
  fetchNewMapData: (mapExtent, zoomLevel, knownGateways, knownCircles, knownRadar, knownAlphas) => dispatch(fetchNewMapData(mapExtent, zoomLevel, knownGateways, knownCircles, knownRadar, knownAlphas))
})

const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)

export default Home;
export { _Home };
