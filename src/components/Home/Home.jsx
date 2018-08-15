import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet'
const { BaseLayer, Overlay } = LayersControl

import './home.css'


const mapSettings = {
  lat: 51.505,
  lng: -0.09,
  zoom: 13,
}

class _Home extends Component {

  addBaseTileLayers() {
    return [
      (
        <BaseLayer checked name="Stamen TonerLite">
          <TileLayer
            key="stamenTonerLiteLayer"
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
        <BaseLayer name="OSM Mapnik">
          <TileLayer
            key="osmMapnikLayer"
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            maxZoom="19"
            fadeAnimation={false}
          />
        </BaseLayer>
      ),
      (
        <BaseLayer name="OSM Mapnik Grayscale">
          <TileLayer
            key="osmMapnikGreyscaleLayer"
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            maxZoom="19"
            fadeAnimation={false}
          />
        </BaseLayer>
      ),
      (
        <BaseLayer name="Terrain">
          <TileLayer
            key="terrainLayer"
            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}'
            attribution='Tiles &copy; Esri &mdash; Source: Esri'
            maxZoom="13"
            fadeAnimation={false}
          />
        </BaseLayer>
      ),
      (
        <BaseLayer name="Satellite">
          <TileLayer
            key="esriWorldImageryLayer"
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            fadeAnimation={false}
          />
        </BaseLayer>
      )
    ]
  }

  render() {
    const position = [mapSettings.lat, mapSettings.lng]

    return (
      <div id="mapsContainer" >
        <Map center={position} zoom={mapSettings.zoom}>
          <LayersControl position="topright">
            {this.addBaseTileLayers()}
          </LayersControl>
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
          </Marker>
        </Map>
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const Home = connect(
  mapStateToProps
)(_Home)

export default Home;
export { _Home };
