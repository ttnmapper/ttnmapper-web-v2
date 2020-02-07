import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map, TileLayer, LayersControl, FeatureGroup } from 'react-leaflet'
import PropTypes from 'prop-types';

import { updateMapPosition, fetchNewMapData } from '../../actions/map-events'
import GatewayRendering from './GatewayRendering/GatewayRendering'
import AlertPopup from '../AlertPopup'
import { parseQuery } from './query-utils'
import MapSettingsSidebar from './MapsettingsSidebar'
import AlphaCoverage from './CoverageRendering/AlphaCoverage'
import RadarCoverage from './CoverageRendering/RadarCoverage'

import 'leaflet/dist/leaflet.css'
import './home.css';
import { mapConstants } from '../../constants';

//const RenderModes = Object.freeze({"none":0, "grid":1, "radar":2, "color_radar":3, "alpha": 4})


/** 
 * This is the main map component. It renders maps with different coverage settings.
 */

class _Home extends Component {
  constructor(props) {
    super(props)

    const {mapDetails, location} = this.props;

    this.mapMovedEventHandler = this.mapMovedEventHandler.bind(this)
    this.gatewayClickedEventHandler = this.gatewayClickedEventHandler.bind(this)
    /*
    Bit of trickery here: When the map is created it gets coordinates, but is never re-rendered.
    Then the map is moved the event listener gets coordinates which don't exactly match.
    We need to store the coords for the url or if the map is re-visited. So: Copy the coords when
    first mounted, and hope they stay in sync.
    */
    this.copiedCoords = Object.assign({}, mapDetails.currentPosition)

    // Check if we should parse URL parameters
    
    if ('search' in location && location.search !== "") {
      this.params = parseQuery(location.search)
    } else {
      this.params = {}
    }
    

    // Copy the coords if they were set in the URL parameters
    if ('lat' in this.params && 'long' in this.params && 'zoom' in this.params) {
      this.copiedCoords.lat = this.params.lat
      this.copiedCoords.long = this.params.long
      this.copiedCoords.zoom = this.params.zoom
    }

    // packets mode will also have deviceID, date_from and date_to
    /*
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
    }*/
  }

  componentDidMount() {
    const {fetchNewMapData, mapDetails} = this.props

    // Once the map is mounted, make sure we have data for all the devices.
    if (this.map) {
      const currentExtent = this.map.leafletElement.getBounds()
      let knownCoverage = {}
      switch(this.gwCoverageMode) {
        case mapConstants.RENDER_MODE_RADAR:
          knownCoverage = mapDetails.gatewayRadarCover; break;
        case mapConstants.RENDER_MODE_COLOR_RADAR:
          break;
        case mapConstants.RENDER_MODE_ALPHA:
          knownCoverage = mapDetails.gatewayAlphaCover; break;
      }

      fetchNewMapData(currentExtent,
        this.copiedCoords.zoom, 
        mapDetails.renderingMode.mode,
        Object.keys(mapDetails.gatewayDetails), 
        Object.keys(knownCoverage)
      )
    }
  }
  componentDidUpdate(prevProps) {
    const {fetchNewMapData, mapDetails} = this.props
    
    if (prevProps.mapDetails.renderingMode.mode !== mapDetails.renderingMode.mode) {
      if (this.map) {
        const currentExtent = this.map.leafletElement.getBounds()
        let knownCoverage = {}
        switch(this.gwCoverageMode) {
          case mapConstants.RENDER_MODE_RADAR:
            knownCoverage = mapDetails.gatewayRadarCover; break;
          case mapConstants.RENDER_MODE_COLOR_RADAR:
            break;
          case mapConstants.RENDER_MODE_ALPHA:
            knownCoverage = mapDetails.gatewayAlphaCover; break;
        }
  
        fetchNewMapData(currentExtent,
          this.copiedCoords.zoom, 
          mapDetails.renderingMode.mode,
          Object.keys(mapDetails.gatewayDetails), 
          Object.keys(knownCoverage)
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
        <LayersControl.BaseLayer key="stamenTonerLiteLayer" checked={this.props.mapDetails.mapLayer.layer === mapConstants.LAYER_TONERLITE} name="Stamen TonerLite">
          <TileLayer
            attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}"
            subdomains="abcd"
            ext='png'
            minZoom="0"
            maxZoom="20"
            fadeAnimation={false}
            zIndex="50"
          />
        </LayersControl.BaseLayer>
      ),
      (
        <LayersControl.BaseLayer key="osmMapnikLayer" checked={this.props.mapDetails.mapLayer.layer === mapConstants.LAYER_OSM_MAPNIK} name="OSM Mapnik">
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            maxZoom="19"
            fadeAnimation={false}
            zIndex="51"
          />
        </LayersControl.BaseLayer>
      ),
      (
        <LayersControl.BaseLayer key="terrainLayer" checked={this.props.mapDetails.mapLayer.layer === mapConstants.LAYER_TERRAIN} name="Terrain">
          <TileLayer
            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}'
            attribution='Tiles &copy; Esri &mdash; Source: Esri'
            maxZoom="13"
            fadeAnimation={false}
            zIndex="52"
          />
        </LayersControl.BaseLayer>
      ),
      (
        <LayersControl.BaseLayer key="esriWorldImageryLayer" checked={this.props.mapDetails.mapLayer.layer === mapConstants.LAYER_SATELLITE} name="Satellite">
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            fadeAnimation={false}
            zIndex="53"
          />
        </LayersControl.BaseLayer>
      ),
      (
        <LayersControl.BaseLayer key="opentopomap" checked={this.props.mapDetails.mapLayer.layer === mapConstants.LAYER_OPEN_TOPO_MAP} name="OpenTopo Map">
          <TileLayer
            attribution='Map Data: © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende, SRTM | Map display: © <a href="http://opentopomap.org/">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            url="https://b.tile.opentopomap.org/{z}/{x}/{y}.png"
            fadeAnimation={false}
            zIndex="54"
          />
        </LayersControl.BaseLayer>
      )
    ]
  }

  /**
   * Handler for the leaflet map.
   * 
   * When the map is moved, check if we need to load new gateways, and store 
   * the new location in localstore.
   */
  mapMovedEventHandler(event) {
    const {updateMapPosition, fetchNewMapData, location, mapDetails} = this.props

    // Get the new coordinates from the object
    let coordsFromMap = event.target.getBounds().getCenter()
    const newCoords = {
      lat: coordsFromMap.lat,
      long: coordsFromMap.lng,
      zoom: event.target.getZoom()
    }

    // Dispatch an event to update the state
    updateMapPosition(newCoords, location.search)

    // Dispatch an event to check and get possible new data
    if (this.map) {
      const currentExtent = this.map.leafletElement.getBounds()
      let knownCoverage = {}
      switch(mapDetails.renderingMode.mode) {
        case mapConstants.RENDER_MODE_RADAR:
          knownCoverage = mapDetails.gatewayRadarCover; break;
        case mapConstants.RENDER_MODE_COLOR_RADAR:
          break;
        case mapConstants.RENDER_MODE_ALPHA:
          knownCoverage = mapDetails.gatewayAlphaCover; break;
      }

      console.log("Known coverage: " + knownCoverage)

      fetchNewMapData(currentExtent,
        newCoords.zoom, 
        this.gwCoverageMode,
        Object.keys(mapDetails.gatewayDetails), 
        Object.keys(knownCoverage)
      )
    }
  }

  gatewayClickedEventHandler(event) {
    console.log(event)
  }


  render() {
    const zoom = this.copiedCoords.zoom
    const position = [this.copiedCoords.lat, this.copiedCoords.long]
    const {mapDetails} = this.props

    let Gateways = (<GatewayRendering rendermode={this.rendermode} />)

    return (
      <div id="mapsContainer">
      
        <MapSettingsSidebar />
        
        <Map
          className="sidebar-map"
          center={position}
          zoom={zoom}
          onMoveend={this.mapMovedEventHandler}
          zoomend={this.mapMovedEventHandler}
          onPopupopen={this.gatewayClickedEventHandler}
          ref={(ref) => { this.map = ref; }}
          maxZoom={18}
          minZoom={2}
        >

          <LayersControl position="topleft" collapsed={true} >
            {this.addBaseTileLayers()}

            <LayersControl.Overlay checked={mapDetails.renderingMode.mode === mapConstants.RENDER_MODE_NONE} name='None'>
              <FeatureGroup />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked={mapDetails.renderingMode.mode === mapConstants.RENDER_MODE_GRID} name='Grid'>
              <TileLayer
                url="https://ttnmapper.org/tms/index.php?tile={z}/{x}/{y}"
                ext='png'
                minZoom="0"
                maxZoom="20"
                fadeAnimation={false}
                opacity="0.5"
                zIndex="5000"
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked={mapDetails.renderingMode.mode === mapConstants.RENDER_MODE_RADAR} name='Radar'>
              <RadarCoverage />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked={mapDetails.renderingMode.mode === mapConstants.RENDER_MODE_COLOR_RADAR} name='Color Radar'>
              <RadarCoverage />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked={mapDetails.renderingMode.mode === mapConstants.RENDER_MODE_ALPHA} name='Alpha Shapes'>
              <AlphaCoverage />
            </LayersControl.Overlay>
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
  fetchNewMapData: (mapExtent, zoomLevel, coverageType, knownDetails, knownCoverage) => dispatch(fetchNewMapData(mapExtent, zoomLevel, coverageType, knownDetails, knownCoverage))
})

const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)

export default Home;
export { _Home };
