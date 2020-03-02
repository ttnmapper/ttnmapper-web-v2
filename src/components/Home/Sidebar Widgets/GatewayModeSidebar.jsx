/* eslint-disable react/prefer-stateless-function */

/** 
 * This component renders the gateways tab in the sidebar. It allows the user to select special 
 * rendering modes for gateways, such as individual gateways, or packet data for a specific 
 * gateway.
 * 
 * Selected gateways mode:
 * In this mode only selected gateways are rendered. Coverage mode is still determined by the 
 * normal coverage selector. 
 * 
 * 
 * When this mode is enabled, no gateways are present. When the edit field is edited a plus sign 
 * becomes visible. When the plus is clicked, the gateway is addedas verifying. The plus is 
 * replaced with a loading icon, and a new field becomes visible. Ifthe gateway is confirmed the 
 * plus space becomes a remove icon, and a check mark is displayed. If the gateway is denied, the
 * check is a cross instead. When the user edits the field it goes back to editing mode.
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { gatewayModeConstants } from '../../../constants'

import {changeGatewayMode, addSMGWClicked, verifySMGWClicked, removeSMGWClicked} from '../../../actions/gatewaymode-actions'


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
    postPendIcon: "plus", 
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

class _GatewayModeSidebar extends Component {

  constructor(props) {
    super(props);

    this.changeGatewayMode = this.changeGatewayMode.bind(this)
    this.addGateway = this.addGateway.bind(this)
    this.updateGateway = this.updateGateway.bind(this)
    this.removeGateway = this.removeGateway.bind(this)

    icoLookup.SMGW_NEW.function = this.addGateway
    icoLookup.SMGW_EDITING.function = this.updateGateway
    icoLookup.SMGW_VERIFYING.function = null
    icoLookup.SMGW_DENIED.function = this.removeGateway
    icoLookup.SMGW_ACCEPTED.function = this.removeGateway

    this.selectedGWValue = []
  }

  // Called when the + button is clicked to add a gateway. The elementId 
  // parameter is only included for compatibility with the other functions
  addGateway(event) {
    const {addSMGWClicked} = this.props
    let index = event.currentTarget.value
    let value = this.selectedGWValue[index].value

    if (!(value === "")) {
      addSMGWClicked(index, this.selectedGWValue[index].value)
    }
  }

  // Called when a gateway is edited and the user clicks the update button
  // This lets us know to re-verify the gwID
  updateGateway(event) {
    const {verifySMGWClicked} = this.props
    let index = event.currentTarget.value
    verifySMGWClicked(index, this.selectedGWValue[index].value)
  }

  // Called when the - button is clicked to remove a gateway
  removeGateway(event) {
    const {removeSMGWClicked} = this.props
    let index = event.currentTarget.value
    removeSMGWClicked(index, this.selectedGWValue[index].value)
  }

  changeGatewayMode(event, newMode){
    const {changeGatewayMode} = this.props
    changeGatewayMode(newMode)
  }

  renderSelectGWElement(lookup, index, inputValue) {
    return (
      <div className="input-group" key={index}>
        <div className="form-control">
          <input type="text" style={{border:0, width:"95%"}} aria-label="" defaultValue={inputValue} ref={(input) => this.selectedGWValue[index] = input} readOnly={icoLookup[lookup].inputReadonly} />
          <span className={"oi inlineIcon " + icoLookup[lookup].inlineIconClass} data-glyph={icoLookup[lookup].inlineIcon} />
        </div>
        <div className="input-group-append">
          <button className={"btn " + icoLookup[lookup].postPendButtonClass} value={index} type="button" id="button-addon2" onClick={icoLookup[lookup].function} style={{width:"2.5em", color:"#eee"}}>
            <span className="oi" data-glyph={icoLookup[lookup].postPendIcon} />
          </button>
        </div>
      </div>
      ) 
  }

  render() {
    const {specialMode, } = this.props
    const {specialModeList: {listOfGW}} = this.props

    let listOfSelectedGWs = []
    for (var i = 0; i < listOfGW.length; i++) {
      listOfSelectedGWs.push(this.renderSelectGWElement(listOfGW[i].gwState, i, listOfGW[i].gwID))
    }

    return (
      <ul className="sbOptionList">

        <li className={'sbComplex ' + (specialMode == gatewayModeConstants.SPECIAL_MODE_LIST ? "active": "")}>
          <span className="sbOptionName">Selected gateways - Coverage</span>

          <div className="sbTextExplanation">Show coverage only for the gateways in the list. Use coverage selection menu to choose coverage option. Add gateways by adding their eui below, or selecting from the map.</div>
          <div className="input-group">
            <button type="button" onClick={(e) => this.changeGatewayMode(e, gatewayModeConstants.SPECIAL_MODE_LIST)}>Enable</button>
          </div>
          
          { listOfSelectedGWs }
          { this.renderSelectGWElement('SMGW_NEW', listOfGW.length, "")} 
        </li>
        <li className={"sbComplex " + (specialMode == gatewayModeConstants.SPECIAL_MODE_AGGREGATED ? "active": "")}>
          <span className="sbOptionName">Aggregated data for gateway</span>
          <div className="sbTextExplanation">Show data received by a single gateway over a timespan</div>
          <div className="input-group">
            <button type="button" onClick={(e) => this.changeGatewayMode(e, gatewayModeConstants.SPECIAL_MODE_AGGREGATED)}>Enable</button>
          </div>
          <div className="input-group">
            <input className="form-control" type="text" id="agg-gateways-gateway-id" name="gateway[]" placeholder="eui-0123456789abcdef" autoComplete="on" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
          </div>
          <div className="input-group">
            <input className="form-control" type="text" placeholder="from date" autoComplete="on" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
          </div>
          <div className="input-group">
            <input className="form-control" type="text" placeholder="to date" autoComplete="on" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
          </div>
          <div className="input-group">
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
    )
  }
}


_GatewayModeSidebar.propTypes = {
  specialMode: PropTypes.string.isRequired,
  specialModeList: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    specialMode: state.mapDetails.gatewayMode.specialMode,
    specialModeList: state.mapDetails.gatewayMode.specialModeList
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeGatewayMode: (newLayer) => dispatch(changeGatewayMode(newLayer)),
  addSMGWClicked: (selectedGwID, newValue) => dispatch(addSMGWClicked(selectedGwID, newValue)),
  verifySMGWClicked: (selectedGwID, newValue) => dispatch(verifySMGWClicked(selectedGwID, newValue)),
  removeSMGWClicked: (selectedGwID, newValue) => dispatch(removeSMGWClicked(selectedGwID, newValue)),
})

const GatewayModeSidebar = connect(mapStateToProps, mapDispatchToProps)(_GatewayModeSidebar)

export default GatewayModeSidebar;
export { GatewayModeSidebar };
