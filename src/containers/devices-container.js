import { connect } from 'react-redux'
import Devices from '../components/devices'

const mapStateToProps = state => ({
	displayCase: state.userData.applications.general.state,
	applications: state.userData.applications.details
})

const mapDispatchToProps = () => {
  return {}
}


export default connect(mapStateToProps)(Devices)