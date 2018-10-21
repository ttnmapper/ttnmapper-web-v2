import React, { Component } from 'react'
import { connect } from 'react-redux'

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
    if (this.props.requestedPackets !== this.props.statePackets) {
      console.log("Data not matching, requesting!")
      this.props.fetchPackets(this.props.requestedPackets.deviceID, this.props.requestedPackets.fromDate, this.props.requestedPackets.toDate)
    }
  }

  render() {
    // if ('mode' in this.params && this.params.mode === 'packets') {
    //   console.log("Rendering packets")
    //   return ("Packets")
    // }
    // else {
      return (" ")
    // }
  }
}

const mapStateToProps = state => {
  return {
    statePackets: state.mapDetails.packets
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPackets: (deviceID, fromDate, toDate) => dispatch(fetchPacketData(deviceID, fromDate, toDate)),
})

const PacketRendering = connect(mapStateToProps, mapDispatchToProps)(_PacketRendering)

export default PacketRendering;
export { _PacketRendering };
