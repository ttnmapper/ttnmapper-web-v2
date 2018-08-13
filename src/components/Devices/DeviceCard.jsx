import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class _DeviceCard extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.hasData) {

    // It's called devices when fetched from the server for some reason
      const { devices } = this.props
      const uid = devices['dev_id']

      return (
        <div className="card device-card" >
          <a data-toggle="collapse" href={"#collapse-device-" + uid} aria-expanded="false" aria-controls={"collapse-device-" + uid}>
            <div className="card-header">
              {devices['description']}
            </div>
          </a>
          <div className="card-body collapse" id={"collapse-device-" + uid}>
            <p className="card-text device-card-text">Last seen: {devices['seen']}</p>
            <div className="cart-text device-card-image">
              <img src={""} style={{ "width": "10em", "height": "10em" }}></img>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (<div className="card device-card" > </div>)
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
