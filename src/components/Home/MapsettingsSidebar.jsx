import React, { Component } from 'react';
import { Sidebar, Tab } from 'react-leaflet-sidebarv2';

import './leaflet-sidebar.css';
import './sidebar-styles.css';

export default class MapSettingsSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      selected: 'home'
    };
  }

  onClose() {
    console.log("Sidebar closed")
    this.setState({ collapsed: true });
  }

  onOpen(id) {
    console.log("Sidebar opened")
    this.setState({
      collapsed: !this.state.collapsed,
      selected: id
    });
  }

  render() {
    return (
      <Sidebar
        id="sidebar"
        closeIcon={<span className="oi" data-glyph="caret-right"></span>}
        collapsed={this.state.collapsed}
        selected={this.state.selected}
        onOpen={this.onOpen.bind(this)}
        onClose={this.onClose.bind(this)}
        position='right'
      >
        <Tab id="map-layer-tab" header="Map layer" icon={<span className="oi" data-glyph="layers"></span>}>
          <ul className="sbOptionList">
            <li className="sbOption"> <a href="#"><span className="sbOptionName">Stamen Tonerlite</span><img src="/images/map_layer_stamen_tonerlite.png" /></a></li>
            <li className="sbOption active"> <a href="#"><span className="sbOptionName">OSM Mapnik</span><img src="/images/map_layer_osm_mapnik.png" /></a></li>
            <li className="sbOption"> <a href="#"><span className="sbOptionName">Terrain</span><img src="/images/map_layer_terrain.png" /></a></li>
            <li className="sbOption"> <a href="#"><span className="sbOptionName">Satellite</span><img src="/images/map_layer_satellite.png" /></a></li>
            <li className="sbOption"> <a href="#"><span className="sbOptionName">Open Topo Map</span><img src="/images/map_layer_open_topo.png" /></a></li>
          </ul>
        </Tab>

        <Tab id="render-mode-tab" header="Render mode" icon={<span className="oi" data-glyph="signal"></span>}>
          <ul className="sbOptionList">
            <li className="sbOption"> <a href="#"><span className="sbOptionName">None</span><img src="/images/render_none.png" /></a></li>
            <li className="sbOption"> <a href="#"><span className="sbOptionName">Heatmap</span><img src="/images/render_grid.png" /></a></li>
            <li className="sbOption active"> <a href="#"><span className="sbOptionName">Radar</span><img src="/images/render_color_radar.png" /></a></li>
            <li className="sbOption"> <a href="#"><span className="sbOptionName">Color Radar</span><img src="/images/render_radar.png" /></a></li>
            <li className="sbOption"> <a href="#"><span className="sbOptionName">Alpha Shapes</span><img src="/images/render_alpha_shape.png" /></a></li>
          </ul>
        </Tab>

        <Tab id="gateways-tab" header="Gateways" icon={<span className="oi" data-glyph="map-marker"></span>}>
          World
        </Tab>
      </Sidebar>
    );
  }
  /*
  render () {
    return (
      <div style={{width:"100px" , height:"100px", zIndex:2000, backgroundColor:"#F03", position:"absolute"}}> ABC</div>
    )
  }*/
}