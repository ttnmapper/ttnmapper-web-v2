import React from 'react'

export const UserDataLoading = ({appName}) => (
	<div className="loading-div card">
	 	<span >Loading user data</span>
		<span className="oi" id="loading" data-glyph="cog" title="icon name" aria-hidden="true"></span>
	</div>
)

export const UserDataError = ({appName}) => (
	<div className="loading-div card">
	 	<span >Error loading user data. Try <a href="#">reloading</a></span>
		<span className="oi" data-glyph="warning" title="icon name" aria-hidden="true"></span>
	</div>
)