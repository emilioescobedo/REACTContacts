'use strict';
var React = require('react');
var DataApi = require('../api/DataApi');

var ContactList = React.createClass({
	getInitialState: function() {
		return {
			contact: []
		}
	},
	componentWillMount: function() {
		this.updateContacts;
	},
	componentDidMount: function() {

	},
	componentWillReceiveProps: function() {
		setTimeout(this.updateContacts, 0.5);
	},
	updateContacts: function() {
		this.setState({contact: this.props.data});
	},
	createContactList: function(data) {
		var list = data.map(function(ele,i) {
			return (
				<li className="item" data-index={ele.id} key={i}>
					<div className="contact-name">
						<span className="name">{ele.firstname}</span>
						<span className="name">{ele.lastname}</span>
					</div>
					<button data-index={ele.id} className="btn btn-small" onClick={this.props.gotoEdit.bind(null, ele.id)}>Edit</button>
					<button data-index={ele.id} className="btn btn-small" onClick={this.props.deleteContact.bind(null, ele.id)}>Delete</button>
				</li>
				)
		}.bind(this));

		return list;
	},
	checkContactExist: function() {
		if (this.props.data) {
			return this.createContactList(this.props.data);
		} else {
			return <li className="item">No Contacts</li>
		}
	},
	render: function() {
		return(
			<ul id="contact-list" className="contact-list">
				{this.checkContactExist()}
			</ul>
		)
	}
});

module.exports = ContactList;


