import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


class _DeviceCard extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		let device = {'uid' : this.props.devID,
		'name': 'demo',
		'seen': 'Just now',
		'map_path': '#'}

		return (
			<div className="card device-card" >
			<a data-toggle="collapse" href={"#collapse-device-" + device['uid']} aria-expanded="false" aria-controls={"collapse-device-" + device['uid']}>
				<div className="card-header">
					{device['name']}
				</div>
			</a>
			<div className="card-body collapse" id={"collapse-device-" + device['uid']}>
				<p className="card-text device-card-text">Last seen: {device['seen']}</p>
				<div className="cart-text device-card-image">
					<img src={device['map_path']} style={{"width":"10em", "height":"10em"}}></img>
				</div>
			</div>
			</div>
	)}

}

_DeviceCard.propTypes = {
}


const mapStateToProps = (state, ownProps) => ({
	devID: ownProps.devID
	})

const mapDispatchToProps = () => {
	return {}
}


export {_DeviceCard }
export default connect(mapStateToProps)(_DeviceCard)