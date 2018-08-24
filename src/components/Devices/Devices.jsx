// Libraries
import React from 'react'
import DeviceCard from './DeviceCard'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Our own code
import { UserDataLoading, UserDataError } from '../small-components'
import { fetchApplications } from '../../actions/fetch-data'

/**
 * This component renders a list of all the devices, sorted by their application
 */
class _Devices extends React.Component {

	constructor(props) {
		super(props)
	}

  /**
   * Render all the component for a specific application ID
   */
	renderApplication(application) {
		let device_panel = application.devices.map(device =>
			(<DeviceCard devID={device} key={device}/>))

		return (
			<div key={application['app_id']}>
				<h1 >
				{ application['description'] }
				</h1>
				{ device_panel }
			</div>)
	}

  /**
   * Render the Applications, Error or Loading display
   * @param {*} displayCase
   */
	correctDisplayCase(displayCase) {
		if (displayCase === "loading") {
			return (<UserDataLoading appName="User"/>)
		} else if (displayCase === "error") {
			return (<UserDataError appName="User"/>)
		} else {
			return this.props.applications.map(this.renderApplication)
		}
	}

	componentDidMount(){
    // Always fetch new data - The fetch logic can decide if that is really required
		this.props.fetchApplications()
	}

	render() {
		return (
		<div className="row">
			<div className="col" />
			<div className="col-8">
			{
				this.correctDisplayCase(this.props.displayCase)
			}
			</div>
			<div className="col" />
		</div>
		)
	}

}

_Devices.propTypes = {
  applications : PropTypes.array.isRequired,
  fetchApplications: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	displayCase: state.userData.applications.general.state,
	applications: state.userData.applications.details
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchApplications: () => dispatch(fetchApplications())
})

export {_Devices }
export default connect(mapStateToProps, mapDispatchToProps)(_Devices)
