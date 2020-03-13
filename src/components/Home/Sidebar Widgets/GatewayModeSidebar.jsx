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

import {changeGatewayMode, addSMGW, removeSMGW} from '../../../actions/gatewaymode-actions'
import {GatewaySearchBar} from './GatewaySearchBar';
import {searchGateways} from '../../../api-calls'

class _GatewayModeSidebar extends Component {

  constructor(props) {
    super(props);
    this.changeGatewayMode = this.changeGatewayMode.bind(this)
    //this.removeButtonClicked = this.removeButtonClicked.bind(this)
  }

  changeGatewayMode(event, newMode){
    const {changeGatewayMode} = this.props
    changeGatewayMode(newMode)
  }

  removeButtonClicked(event) {
    console.log("Event: ")
    console.log
    const {target: {dataset : {index}}} = event
    console.log(event.target.dataset)
    console.log("Index is " + index)
    const {removeSMGW} = this.props
    removeSMGW(index)
  }


  render() {
    const {specialMode,addSMGW } = this.props
    const {specialModeList: {listOfGW}} = this.props


    return (
      <ul className="sbOptionList">

        <li className={'sbComplex ' + (specialMode == gatewayModeConstants.SPECIAL_MODE_LIST ? "active": "")}>
          <span className="sbOptionName">Selected gateways - Coverage</span>

          <div className="sbTextExplanation input-group">Show coverage only for the gateways in the list. Use coverage selection menu to choose coverage option. Add gateways by adding their eui below, or selecting from the map.</div>
          <div className="input-group">
            <button type="button" onClick={(e) => this.changeGatewayMode(e, gatewayModeConstants.SPECIAL_MODE_LIST)}>Enable</button>
          </div>

          <GatewaySearchBar makeAndHandleRequest={searchGateways} addEntry={addSMGW} filterExisting={listOfGW} />

          <ul className="smgwList input-group">
            {listOfGW.map((entry, index) => {
              console.log("Rendering entry with index " + index)
              return(
              
              <li className="smgwItem" key={"list_item_" + index}>
                <span className="name">{entry}</span>
                <button className="btn btn-outline-danger btn-xs" type="button" style={{width:"2em"}} onClick={this.removeButtonClicked.bind(this)}><span className="oi" data-glyph="x" data-index={index} /></button>
              </li>
            )}
            
            )}
            
          </ul>
          
        </li>
        {/* <li className={"sbComplex " + (specialMode == gatewayModeConstants.SPECIAL_MODE_AGGREGATED ? "active": "")}>
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
        </li> */}
      </ul>
    )
  }
}


_GatewayModeSidebar.propTypes = {
  specialMode: PropTypes.string.isRequired,
  specialModeList: PropTypes.object.isRequired,
  changeGatewayMode: PropTypes.func.isRequired,
  addSMGW: PropTypes.func.isRequired,
  removeSMGW: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    specialMode: state.mapDetails.gatewayMode.specialMode,
    specialModeList: state.mapDetails.gatewayMode.specialModeList
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeGatewayMode: (newLayer) => dispatch(changeGatewayMode(newLayer)),
  addSMGW: (gwid) => dispatch(addSMGW(gwid)),
  removeSMGW: (index) => dispatch(removeSMGW(index))
})

const GatewayModeSidebar = connect(mapStateToProps, mapDispatchToProps)(_GatewayModeSidebar)

export default GatewayModeSidebar;
export { GatewayModeSidebar };
