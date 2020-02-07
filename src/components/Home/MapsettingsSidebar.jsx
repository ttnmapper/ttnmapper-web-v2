import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Sidebar, Tab } from 'react-leaflet-sidebarv2';

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
          <ul className="sbOptionList">
            {/* <li className="sbOption">
              <div className="sbComplex">
                <span className="sbOptionName">All Gateways</span>
                <div className="inputGroup"> 
                  <button type="button">Enable</button>
                </div>
              </div>
            </li> */}
            <li className="sbComplex"> 
              <span className="sbOptionName">Selected gateways - Coverage</span>
              
              <div className="sbTextExplanation">Show coverage only for the gateways in the list. Use coverage selection menu to choose coverage option. Add gateways by adding their eui below, or selecting from the map.</div>
              <div className="input-group"> 
                <button type="button">Enable</button>
              </div>

              <div className="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text oi sbInputInvalid" data-glyph="ban" />
                </div>
                <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
                <div className="input-group-append">
                  <span className="input-group-text">+</span>
                </div>
              </div>
                
            </li>
            <li className="sbComplex active">
              <span className="sbOptionName">Aggregated data for gateway</span>
              <div className="inputGroup"> 
                <button type="button">Enable</button>
              </div>
              <div className="sbTextExplanation">Show data received by a single gateway over a timespan</div>
              <div className="inputGroup">
                <input className="form-control" type="text" id="agg-gateways-gateway-id" name="gateway[]" placeholder="eui-0123456789abcdef" autoComplete="on" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
              </div>
              <div className="inputGroup">
                <input className="form-control" type="text" placeholder="from date" autoComplete="on" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
              </div>
              <div className="inputGroup">
                <input className="form-control" type="text" placeholder="to date" autoComplete="on" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
              </div>
              <div className="inputGroup"> 
                <label htmlFor="gatewayGateways" id="">
                  <input type="checkbox" id="gatewayGateways" name="gateways" checked />
                  Show marker for gateway
                </label>
                <label htmlFor="gatewayLines">
                  <input type="checkbox" id="gatewayLines" name="lines" checked />
                  Draw lines to measurement
                </label>
                <label htmlFor="gatewayCircles">
                  <input type="checkbox" id="gatewayCircles" name="circles" checked />
                  Draw circle at measurement location
                </label>
              </div>
            </li>
          </ul>
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
