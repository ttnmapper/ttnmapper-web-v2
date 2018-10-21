
import React, { Component } from 'react'
import { connect } from 'react-redux'

class _CloseSaver extends Component {

  constructor(props) {
    super(props)
    //If there is a code, dispatch a function
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.handleBeforeunload);
    console.log("Read the following from local storage")
    console.log(localStorage.getItem("savedMapState"))
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleBeforeunload);
  }

  handleBeforeunload = event => {
    let saveObject ={
      currentPosition: this.props.mapDetails.currentPosition,
      visibleGateways: this.props.mapDetails.visibleGateways
    }

    let gatewayRadarCover = []
    let gatewayCircleCover = []
    let gatewayDetails = []
    // Only save the details of the visible gateways
    for (let gatewayID in this.props.mapDetails.visibleGateways) {
      gatewayRadarCover.push(this.props.mapDetails.gatewayRadarCover[gatewayID])
      gatewayCircleCover.push(this.props.mapDetails.gatewayCircleCover[gatewayID])
      gatewayDetails.push(this.props.mapDetails.gatewayDetails[gatewayID])
    }

    saveObject.gatewayRadarCover = gatewayRadarCover
    saveObject.gatewayCircleCover = gatewayCircleCover
    saveObject.gatewayDetails = gatewayDetails

    localStorage.setItem("savedMapState", JSON.stringify(saveObject))
  };

  render() {
    return ("")
  }
}

const mapStateToProps = state => ({
  mapDetails: state.mapDetails
})


const CloseSaver = connect(mapStateToProps)(_CloseSaver)

export default CloseSaver
export { _CloseSaver }
