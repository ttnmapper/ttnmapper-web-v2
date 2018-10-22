import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popup, CircleMarker, GeoJSON, Polyline } from 'react-leaflet'

import {fetchPacketData} from '../../../actions/map-events'


class _PacketRendering extends Component {

  constructor(props) {
    super(props)
    // if ('location' in props && 'search' in props.location && props.location.search !== "") {
    //   this.params = parseQuery(props.location.search)
    // } else {
    //   this.params = {}
    // }
    console.log(props)
  }

  componentDidMount() {
    //Check if our settings match the state settings
    if (this.props.requestedPackets) {
      if (this.props.requestedPackets !== this.props.statePackets) {
        console.log("Data not matching, requesting!")
        this.props.fetchPackets(this.props.requestedPackets.deviceID, this.props.requestedPackets.fromDate, this.props.requestedPackets.toDate)
      }
    }
  }

  renderPacket(packet) {
    let color = '#0000ff'
    let rssi = parseFloat(packet.rssi)
    let snr = parseFloat(packet.snr)

    if (snr < 0) {
      rssi = rssi + snr
    }
    if (rssi == 0) {
      color = "black"
    }
    else if (rssi < -120) {
      color = "blue"
    }
    else if (rssi < -115) {
      color = "cyan"
    }
    else if (rssi < -110) {
      color = "green"
    }
    else if (rssi < -105) {
      color = "yellow"
    }
    else if (rssi < -100) {
      color = "orange"
    }
    else {
      color = "red"
    }

    const lineOptions = {
      radius: 10,
      color: color,
      fillColor: color,
      opacity: 0.3,
      weight: 2
    };

    const markerOptions = {
      stroke: false,
      radius: 5,
      color: color,
      fillColor: color,
      fillOpacity: 0.8
    };

    const distance = 5

    let lines = []
    // Look up the gateway locations
    if (this.props.gateways) {
      if (packet.gwaddr in this.props.gateways) {
        const gw = this.props.gateways[packet.gwaddr]

        lines = [[packet.lat, packet.lon], [gw.lat, gw.lon]]
      }
    }

    return (
      <CircleMarker center={[packet.lat, packet.lon]} {...markerOptions} key={"marker_" + packet.id}>
        <Popup>
          {packet.time}
          <br />
          <b>Node:</b> {packet.nodeaddr}<br />
          <b>Received by gateway:</b> <br />{packet.gwaddr}<br />
          <b>Location accuracy:</b> {packet.accuracy}<br />
          <b>Packet id:</b> {packet.id}<br />
          <b>RSSI:</b> {packet.rssi}dBm<br />
          <b>SNR:</b> {packet.snr}dB<br />
          <b>Link cost:</b> {rssi*-1}dB<br />
          <b>DR:</b> {packet.datarate}<br />
          <b>Distance:</b> {distance}m<br />
          <b>Altitude: </b> {packet.alt}m <br/>
        </Popup>
        <Polyline positions={lines} {...lineOptions} />
      </CircleMarker>
    )
  }

  render() {
    if (this.props.requestedPackets) {
      if (this.props.statePackets.packetsData.length > 0) {
        let listOfMarkers = []
        for (let i = 0; i < this.props.statePackets.packetsData.length; i++) {
          listOfMarkers.push(this.renderPacket(this.props.statePackets.packetsData[i]))
        }
        return listOfMarkers
      }
    }
    return (" ")
  }
}

const mapStateToProps = state => {
  return {
    statePackets: state.mapDetails.packets,
    gateways: state.mapDetails.gatewayDetails
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPackets: (deviceID, fromDate, toDate) => dispatch(fetchPacketData(deviceID, fromDate, toDate)),
})

const PacketRendering = connect(mapStateToProps, mapDispatchToProps)(_PacketRendering)

export default PacketRendering;
export { _PacketRendering };
