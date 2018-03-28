'use strict';
var React = require('react');


var ContactInput = React.createClass({
	render: function() {
		return (
			<div>
				<label className="form-label" htmlFor={this.props.inputname}>{this.props.label}</label>
				<input
					className={this.props.inputname}
					name={this.props.inputname}
					type={this.props.type}
					placeholder={this.props.placeholder}
					value={this.props.value}
					required
					pattern={this.props.pattern}
					disabled={this.props.inputDisabled}
					onChange={this.props.onChange}
				></input>
			</div>
		);
	}
});



module.exports = ContactInput;