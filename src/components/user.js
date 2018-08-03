import React from 'react'
import { Link } from 'react-router'

import { Devices, Gateways} from '.'

const User = ({ children }) => (
	<div className="container">
		<div className="row">
			<ul className="nav nav-tabs user-nav">
				<li className="nav-item"><Link className="nav-link user-tab-options" activeClassName="user-tab-selected" to="/user/devices">Devices</Link></li>
				<li className="nav-item"><Link className="nav-link user-tab-options" activeClassName="user-tab-selected" to="/user/gateways">Gateways</Link></li>
				<li className="nav-item"><Link className="nav-link user-tab-options" activeClassName="user-tab-selected" to="/user/experiments">Experiments</Link></li>
				<li className="nav-item"><Link className="nav-link user-tab-options" activeClassName="user-tab-selected" to="/user/settings">Settings</Link></li>
			</ul> 
		</div>
		{ children }
	</div>
) 

export default User;
