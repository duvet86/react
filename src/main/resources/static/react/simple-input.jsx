'use strict'

import React, { Component } from 'react'

export default class MarkdownEditor extends Component {

	constructor(props) {
		super(props);
		this.state = {value: ''};
	}
	
	// doing this instead of bind-ing the 'this' to the component html
	handleChange = (event) => {
		this.setState({value: event.target.value});
	};
	
	render() {
	    var value = this.state.value;
	    return (
	    	<div>
	    		<h3>Input</h3>
	    		<input type="text" value={value} onChange={this.handleChange} />
	    		<h3>Output</h3>
	            <div>{value}</div>
	    	</div>
	    );
	}
	
}