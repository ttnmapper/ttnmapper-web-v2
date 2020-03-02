
import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import {addSMGWClicked, verifySMGWClicked, removeSMGWClicked} from '../../../actions/gatewaymode-actions'

let icoLookup = {
    SMGW_NEW: {
      inlineIcon: "",
      inlineIconClass: "editing",
      postPendIcon: "plus", 
      postPendButtonClass: "btn-success", 
      postPendButtoncallback: ""
    },
    SMGW_EDITING: {
      inlineIcon: "",
      inlineIconClass: "editing",
      postPendIcon: "pencil", 
      postPendButtonClass: "btn-success", 
      postPendButtoncallback: ""
    },
    SMGW_VERIFYING: {
      inlineIcon: "cog",
      inlineIconClass: "verifying",
      postPendIcon: "minus",
      postPendButtonClass: "btn-secondary",
      postPendButtoncallback: "",
      inputReadonly: true
    },
    SMGW_DENIED: {
      inlineIcon: "ban",
      inlineIconClass: "denied",
      postPendIcon: "minus",
      postPendButtonClass: "btn-danger", 
      postPendButtoncallback: ""
    },
    SMGW_ACCEPTED: {
      inlineIcon: "check",
      inlineIconClass: "accepted",
      postPendIcon: "minus",
      postPendButtonClass: "btn-danger",
      postPendButtoncallback: ""
    }
  }

class _SMGWEntry extends Component {

  constructor(props) {
    super(props);

    this.addGateway = this.addGateway.bind(this)
    this.updateGateway = this.updateGateway.bind(this)
    this.removeGateway = this.removeGateway.bind(this)

    this.functionLookup = {
      SMGW_NEW : this.addGateway,
      SMGW_EDITING: this.updateGateway,
      SMGW_VERIFYING: null,
      SMGW_DENIED: this.removeGateway,
      SMGW_ACCEPTED: this.removeGateway,
    }

    const {entryGw, entryState} = this.props
    this.state = { entryGw: entryGw, localState: entryState}
  }

  componentWillReceiveProps(nextProps) {
    const {localState, entryGw} = this.state
    if (nextProps.entryState !== localState) {
      //Forcibly overwrite input value to new default if the default ever changes
      this.setState({localState: nextProps.entryState});
    }
    if (nextProps.entryGw !== entryGw) {
      this.setState({entryGw: nextProps.entryGw});
    }
  }

  inputValueChanged(newvalue) {
    
    this.setState({entryGw: newvalue})
    const {entryState} = this.props
    if (entryState != "SMGW_NEW") {
      this.setState({localState: 'SMGW_EDITING'})
    }
  }

  // Called when the + button is clicked to add a gateway. The elementId 
  // parameter is only included for compatibility with the other functions
  addGateway() {
    const {addSMGWClicked, entryIndex} = this.props
    const {entryGw} = this.state

    if (!(entryGw === "")) {
      addSMGWClicked(entryIndex, entryGw)
    }
  }

  // Called when a gateway is edited and the user clicks the update button
  // This lets us know to re-verify the gwID
  updateGateway() {
    const {verifySMGWClicked, entryIndex} = this.props
    const {entryGw} = this.state
    verifySMGWClicked(entryIndex, entryGw)
  }

  // Called when the - button is clicked to remove a gateway
  removeGateway() {
    const {removeSMGWClicked, entryIndex} = this.props
    const {entryGw} = this.state
    removeSMGWClicked(entryIndex, entryGw)
  }


  render() {
    const {entryIndex} = this.props
    const {entryGw, localState} = this.state
    return (
      <div className="input-group" key={entryIndex}>
        <div className="form-control">
          <input type="text" style={{border:0, width:"95%"}} aria-label="" value={entryGw} onChange={e => this.inputValueChanged(e.target.value)} readOnly={icoLookup[localState].inputReadonly} />
          <span className={"oi inlineIcon " + icoLookup[localState].inlineIconClass} data-glyph={icoLookup[localState].inlineIcon} />
        </div>
        <div className="input-group-append">
          <button className={"btn " + icoLookup[localState].postPendButtonClass} value={entryIndex} type="button" id="button-addon2" onClick={this.functionLookup[localState]} style={{width:"2.5em", color:"#eee"}}>
            <span className="oi" data-glyph={icoLookup[localState].postPendIcon} />
          </button>
        </div>
      </div>
      ) 
  }

}


_SMGWEntry.propTypes = {
  addSMGWClicked: PropTypes.func.isRequired,
  verifySMGWClicked: PropTypes.func.isRequired,
  removeSMGWClicked: PropTypes.func.isRequired,
  entryIndex: PropTypes.number.isRequired,
  entryState: PropTypes.string.isRequired,
  entryGw: PropTypes.string.isRequired
}
  
const mapStateToProps = state => {
  return {
    specialMode: state.mapDetails.gatewayMode.specialMode,
    specialModeList: state.mapDetails.gatewayMode.specialModeList
  }
}
  
const mapDispatchToProps = (dispatch) => ({
  addSMGWClicked: (selectedGwID, newValue) => dispatch(addSMGWClicked(selectedGwID, newValue)),
  verifySMGWClicked: (selectedGwID, newValue) => dispatch(verifySMGWClicked(selectedGwID, newValue)),
  removeSMGWClicked: (selectedGwID, newValue) => dispatch(removeSMGWClicked(selectedGwID, newValue)),
})
  
const SMGWEntry = connect(mapStateToProps, mapDispatchToProps)(_SMGWEntry)

export default SMGWEntry;
export { SMGWEntry };
