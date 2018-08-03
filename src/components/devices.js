import React from 'react'
import DeviceCard from '../components/device-card.js'
import PropTypes from 'prop-types'
import { UserDataLoading, UserDataError } from './small-components'
import { fetchApplications } from '../actions/fetch-data'

class Devices extends React.Component {

	constructor(props) {
		super(props)
	}

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
		const { dispatch } = this.props
		dispatch(fetchApplications())
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

Devices.propTypes = {
	dispatch: PropTypes.func.isRequired,
	applications : PropTypes.array.isRequired
}

export default Devices;