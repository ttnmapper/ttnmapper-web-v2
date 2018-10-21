import React from 'react'
import PropTypes from 'prop-types'
import { Map, TileLayer,  } from 'react-leaflet'
import { Marker, Popup } from 'react-leaflet'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import L from 'leaflet';

// Workaround for leaflet css?
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css'

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// });

const gwMarkerIconRoundBlue = L.icon({
  iconUrl: require("../Home/GatewayRendering/images/gateway_dot.png"),
  iconSize: [20, 20], // size of the icon
  iconAnchor: [10, 10], // point of the icon which will correspond to marker\'s location
  popupAnchor: [10, 10] // point from which the popup should open relative to the iconAnchor
});




class _DeviceCard extends React.Component {

  constructor(props) {
    super(props)
  }


  render() {
    if (this.props.hasData) {

      // It's called devices when fetched from the server for some reason
      const { devices } = this.props
      const uid = devices['dev_id']

      const default_zoom = 10
      const device_position = [devices.latitude, devices.longitude]

      return (
        <div className="card device-card" >
          <a data-toggle="collapse" href={"#collapse-device-" + uid}  aria-expanded="false" aria-controls={"collapse-device-" + uid}>
            <div className="card-header">
              {devices['dev_id']}
            </div>
          </a>
          <div className="card-body">
            <div className="info-block" >
              <div className="card-desription">{devices['description']}</div>
              <div><span className="card-key">Device EUI</span><span className="card-value">&nbsp;{devices.lorawan_device.dev_eui}</span></div>
              <div><span className="card-key">Last Seen</span><span className="card-value">&nbsp;A week ago</span></div>
              <div><span className="card-key">Coordinates</span><span className="card-value">&nbsp;{"N" +devices['latitude']+" E"+devices['longitude']}&nbsp;</span></div>
              <div className="card-links">
                <NavLink to={"/?mode=packets&deviceID=" + uid + "&fromDate=&toDate="}>View full map</NavLink>
                <a href="/">Download CSV data</a>
              </div>
            </div>
            <div className="map-block leaflet-container">
              <Map center={device_position} zoom={default_zoom} zoomControl={false} dragging={false} touchZoom={false} doubleClickZoom={false} scrollWheelZoom={false} boxZoom={false} keyboard={false}>
                <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    maxZoom="19"
                  />
                  <Marker key={"marker-"+devices['dev_id']} position={device_position} icon={gwMarkerIconRoundBlue}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
              </Map>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (<div className="card device-card" > </div>)
    }
  }

  componentDidMount(){
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
