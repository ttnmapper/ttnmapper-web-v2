import React from 'react'
import PropTypes from 'prop-types'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Panel } from 'react-bootstrap';

// Workaround for leaflet css?
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css'

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// });

import { gwMarkerIconRoundBlue } from '../Home/GatewayRendering/GatewayRendering'
// const gwMarkerIconRoundBlue = L.icon({
//   iconUrl: require("../Home/GatewayRendering/images/gateway_dot.png"),
//   iconSize: [20, 20], // size of the icon
//   iconAnchor: [10, 10], // point of the icon which will correspond to marker\'s location
//   popupAnchor: [10, 10] // point from which the popup should open relative to the iconAnchor
// });




class _DeviceCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.state.activeKey = true
  }


  render() {
    if (this.props.hasData) {

      // It's called devices when fetched from the server for some reason
      const { devices } = this.props
      const uid = devices['dev_id']

      const default_zoom = 10
      const device_position = [devices.latitude, devices.longitude]

      return (
        <Panel className="card device-card" defaultExpanded activeKey={this.state.activeKey}>
          <Panel.Heading className="card-header">
            <Panel.Title toggle>
            Panel heading with a title
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body className="card-body">
              Panel content
          </Panel.Body>
          </Panel.Collapse>
        </Panel>

      )
    }
    else {
      return (<div className="card device-card" > </div>)
    }
  }
  //zoomControl={false} dragging={false} touchZoom={false} doubleClickZoom={false} scrollWheelZoom={false} boxZoom={false} keyboard={false}
  componentDidMount() {
    if (this.map) {
      this.map.invalidateSize()
    }
  }

}

_DeviceCard.propTypes = {
  devID: PropTypes.string.isRequired
}


function mapStateToProps(state, ownProps) {
  const devID = ownProps.devID

  if (devID in state.userData.devices.details) {
    return {
      devID: devID,
      hasData: true,
      ...state.userData.devices.details[devID]
    }
  } else {
    return {
      hasData: false,
      devID: devID,
    }
  }
}

const mapDispatchToProps = () => {
  return {}
}


export { _DeviceCard }
export default connect(mapStateToProps)(_DeviceCard)
