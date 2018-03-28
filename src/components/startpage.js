'use strict';
var React = require('react');
var DataApi = require('../api/DataApi');
var ContactDataStore = require('../stores/contactDataStore');

var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../dispatcher/actionTypes');

var ContactList = require('./contactList');
var ContactForm = require('./contactForm');
var Header = require('./shared/header');
var Footer = require('./shared/footer');


var StartPage = React.createClass({
	getInitialState: function() {
		return {
			contactData: null,
			windowHash: null,
			pushState: null,
			singleContact: null,
			singleContactId: 1,
			formState: "add",
		}
	},
	componentWillMount: function() {
		this.setState({contactData: DataApi.getContacts()});
		ContactDataStore.addChangeListener(this.onChange);
	},
	componentDidMount: function() {

	},
	onChange: function() {
		this.setState({
			contactData: DataApi.getContacts(),
			singleContact: DataApi.getSingleContact(this.state.singleContactId)
		});
	},
	changeFormState: function(newState) {
		this.setState({formState: newState});
	},
	goto_AddContact: function() {
		this.setState({singleContact: null});
		this.changeFormState('add');
	},
	goto_EditContact: function(contactId) {
		this.setState({
			singleContact: DataApi.getSingleContact(contactId),
			singleContactId: contactId
		});

		this.changeFormState('edit');
	},
	updateChanges: function(contactItem) {
		if (this.state.formState === 'edit') {
			DataApi.editContact(contactItem);
		} else if (this.state.formState === 'add') {
			var id = DataApi.addContact(contactItem);
			
			this.setState({
				singleContactId: id,
				singleContact: DataApi.getSingleContact(0)
			 });

			setTimeout(function() {
				this.setState({singleContact: null})
				}.bind(this), 10);
		}
	},
	deleteContact: function(id) {
		DataApi.deleteContact(id);
	},
	instruction: function() {
		return (
			<div className="instruction-text">
				<p>Click New to create contact</p>
				<p>Or click Edit to edit an existing contact.</p>
			</div>
			)
	},
	render: function() {
		return (
			<div className="app-container">
				<Header />
				<section className="content-container section-content">
					<div className="info-list">
						<div className="addbtn-container">
							<button className="btn btn-large" onClick={this.goto_AddContact}>+ New</button>
						</div>
						<div>
							<ContactList data={this.state.contactData} changeFormState={this.changeFormState}
								deleteContact={this.deleteContact} gotoEdit={this.goto_EditContact} />
						</div>
					</div>

					<div className="form-container">
						<ContactForm 
							editInfo={this.state.singleContact}
							changeFormState={this.changeFormState}
							formState={this.state.formState}
							updateChanges={this.updateChanges}
						></ContactForm>
					</div>
				</section>
				<Footer />
			</div>
		);
	}
});



module.exports = StartPage;