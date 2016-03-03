import React from 'react'
import { IndexLink } from 'react-router'
import NavLink from './NavLink.component'

export default React.createClass({
	render() {
		return (
				<div>
					<h1><IndexLink to="/">React Router Tutorial</IndexLink></h1>
					<ul role="nav">
						<li><NavLink to="/about">About</NavLink></li>
						<li><NavLink to="/repos">Repos</NavLink></li>
					</ul>
					{this.props.children}
				</div>
		)
	}
})