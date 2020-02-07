import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Sidebar, Tab } from 'react-leaflet-sidebarv2';
import GatewayModesidebar from './Sidebar Widgets/GatewayModeSidebar'

import { updateMapLayer, updateGwCoverage } from '../../actions/map-events'

import './leaflet-sidebar.css';
import './sidebar-styles.css';
import { mapConstants } from '../../constants';


const layer_definitions = [
  {name: "Stamen Tonerlite", image: "/images/map_layer_stamen_tonerlite.png", alt: "Select the Tonerlite map", constant: mapConstants.LAYER_TONERLITE},
  {name: "OSM Mapnik", image: "/images/map_layer_osm_mapnik.png", alt: "Select the OSM Mapnik map", constant: mapConstants.LAYER_OSM_MAPNIK},
  {name: "Terrain", image: "/images/map_layer_terrain.png", alt: "Select the Terrain map", constant: mapConstants.LAYER_TERRAIN},
  {name: "Satellite", image: "/images/map_layer_satellite.png", alt: "Select the Satellite map", constant: mapConstants.LAYER_SATELLITE},
  {name: "Open Topo Map", image: "/images/map_layer_open_topo.png", alt: "Select the Open Topo map", constant: mapConstants.LAYER_OPEN_TOPO_MAP}]

const coverage_definitions = [
  {name:"None", image:"/images/render_none.png", alt:"Select no coverage", constant: mapConstants.RENDER_MODE_NONE},
  {name:"Heatmap", image:"/images/render_grid.png", alt:"Select heatmap coverage", constant: mapConstants.RENDER_MODE_GRID},
  {name:"Radar", image:"/images/render_color_radar.png", alt:"Select radar coverage", constant: mapConstants.RENDER_MODE_RADAR},
  {name:"Color Radar", image:"/images/render_radar.png", alt:"Select color radar coverage", constant: mapConstants.RENDER_MODE_COLOR_RADAR},
  {name:"Alpha Shapes", image:"/images/render_alpha_shape.png", alt:"Select alpha shape coverage", constant: mapConstants.RENDER_MODE_ALPHA}
]

class _MapSettingsSidebar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      selected: 'home'
    };

    this.onClose = this.onClose.bind(this)
    this.onOpen = this.onOpen.bind(this)
  }

  onClose() {
    this.setState({ collapsed: true });
  }

  onOpen(id) {
    const {selected} = this.state;

    // If the selected match the currently selected, close. Otherwise open the next tab
    if (selected  == id) {
      this.setState({
        collapsed: true,
        selected: id
      });
    } else {
      this.setState({
        collapsed: false,
        selected: id
      });
    }
  }

  layerChangeClicked(e, newlayer) {
    const {updateMapLayer} = this.props;
    e.preventDefault()
    updateMapLayer(newlayer)
  }

  coverageChangeClicker(e, newCoverage) {
    const {updateGwCoverage} = this.props;
    e.preventDefault()
    updateGwCoverage(newCoverage)
  }  

  render() {

    const {collapsed, selected} = this.state;

    return (
      <Sidebar
        id="sidebar"
        closeIcon={<span className="oi" data-glyph="caret-right"/>}
        collapsed={collapsed}
        selected={selected}
        onOpen={this.onOpen}
        onClose={this.onOpen}
        position='right'
      >
        <Tab id="map-layer-tab" header="Map layer" icon={<span className="oi" data-glyph="layers" />}>
          <ul className="sbOptionList">
            {layer_definitions.map((layer) => (
              <li key={layer.name} className="sbOption">
                <button type="button" onClick={(e) => this.layerChangeClicked(e, layer.constant)}>
                  <span className="sbOptionName">{layer.name}</span>
                  <img alt={layer.alt} src={layer.image} />
                </button>
              </li>
            )
            )}
          </ul>
        </Tab>

        <Tab id="render-mode-tab" header="Render mode" icon={<span className="oi" data-glyph="signal" />}>
          <ul className="sbOptionList">
            {coverage_definitions.map((coverage) => (
              <li key={coverage.name} className="sbOption ">
                <button type="button" onClick={(e) => this.coverageChangeClicker(e, coverage.constant)}>
                  <span className="sbOptionName">{coverage.name}</span>
                  <img alt={coverage.alt} src={coverage.image} />
                </button>
              </li>
            )
            )}
          </ul>
        </Tab>
          
        <Tab id="gateways-tab" header="Gateways" icon={<span className="oi" data-glyph="map-marker" />}>
          <GatewayModesidebar />
        </Tab>
      </Sidebar>
    );
  }
}


_MapSettingsSidebar.propTypes = {
  renderingMode: PropTypes.object.isRequired,
  mapLayer: PropTypes.string.isRequired,
  updateMapLayer: PropTypes.func.isRequired,
  updateGwCoverage: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    renderingMode: state.mapDetails.renderingMode,
    mapLayer: state.mapDetails.mapLayer.layer
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateMapLayer: (newLayer) => dispatch(updateMapLayer(newLayer)),
  updateGwCoverage: (newCoverage) => dispatch(updateGwCoverage(newCoverage)),
})

const MapSettingsSidebar = connect(mapStateToProps, mapDispatchToProps)(_MapSettingsSidebar)

export default MapSettingsSidebar;
export { MapSettingsSidebar };
