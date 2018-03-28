'use strict';
var React = require('react');
var ContactInput = require('./shared/contactInput');
var ContactValidation = require('../api/contactValidation.js');
var DataApi = require('../api/DataApi');

var ContactForm = React.createClass({
	getInitialState: function() {
		return {
			contact: {
				id: null,
				firstname: null,
				lastname: null,
				birthday: null,
				company: null,
				email: null,
				phone: null
			},
			inputDisabled: false
		}
	},
	componentDidMount: function() {
		setTimeout(this.setContactInfo, 100);
		var contactForm = document.getElementById('contact-form');
		ContactValidation.init(contactForm);
	},
	componentWillReceiveProps: function() {
		//takes a millisend to receive the props
		//change states after props are received
		setTimeout(this.setContactInfo, 100);
		setTimeout(this.inputDisabled, 100);
	},
	setContactInfo: function() {
		if (this.props.editInfo) {
			this.setState({contact: {
					id: this.props.editInfo.id,
					firstname: this.props.editInfo.firstname,
					lastname: this.props.editInfo.lastname,
					birthday: this.props.editInfo.birthday,
					company: this.props.editInfo.company,
					email: this.props.editInfo.email,
					phone: this.props.editInfo.phone
				}
			})
		} else {
			this.setState({contact: {
					id: null,
					firstname: null,
					lastname: null,
					birthday: null,
					company: null,
					email: null,
					phone: null
				}
			})
		}
	},
	setInputValue: function(evt) {
		var value = evt.target.value;
		var field = evt.target.name;
		this.state.contact[field] = value;
		this.setState({contact: this.state.contact});
	},
	cancelChanges: function(evt) {
		this.props.changeFormState('cancel');
	},
	saveChanges: function(evt) {
		evt.preventDefault();
		this.props.updateChanges(this.state.contact);
	},
	checkInput: function(evt) {
		ContactValidation.checkInput(evt);
	},
	headingText: function() {
		switch (this.props.formState) {
			case "add":
				return "ADD CONTACT";
				break;
			case "edit":
				return "EDIT CONTACT " + this.existNameCheck();
				break;
			case "cancel":
				return "CHANGES CANCELLED";
				break;
			default: return "ADD CONTACT";
		}
	},
	inputDisabled: function() {
		setTimeout(function() {
			if (this.props.formState === 'cancel') {
				this.setState({inputDisabled: true});
			} else {
				this.setState({inputDisabled: false});
			}
		}.bind(this),100)

	},
	existNameCheck: function() {
		if (this.props.editInfo) {
			return "("+this.props.editInfo.firstname + " " + this.props.editInfo.lastname+")";
		} else {
			return "(deleted)"
		}
	},
	render: function() {
		return(
			<section className="edit-area">
				<h2 className="form-heading">{this.headingText()}</h2>
				<form id="contact-form" onSubmit={this.saveChanges}>
					<div className="form-content">
						<div className="contact-input f-left">
							<ContactInput 
								inputname="firstname" label="First Name" type="text" inputDisabled={this.state.inputDisabled}
								placeholder="Enter First Name" value={this.state.contact.firstname} onChange={this.setInputValue} />
							<ContactInput inputname="lastname" label="Last Name" type="text" inputDisabled={this.state.inputDisabled}
								placeholder="Enter Last Name" value={this.state.contact.lastname} onChange={this.setInputValue} />
							<ContactInput inputname="birthday" label="Birthday" type="text" inputDisabled={this.state.inputDisabled}
								placeholder="DD/MM/YYYY" value={this.state.contact.birthday} pattern="(0[1-9]|1[0-9]|2[0-9]|3[01])/(0[1-9]|1[012])/[0-9]{4}" onChange={this.setInputValue} />
							<ContactInput inputname="company" label="Company" type="text" inputDisabled={this.state.inputDisabled}
								placeholder="Enter Company" value={this.state.contact.company} onChange={this.setInputValue} />
							<ContactInput inputname="email" label="Email" type="email" inputDisabled={this.state.inputDisabled}
								placeholder="example@domain.com" value={this.state.contact.email} onChange={this.setInputValue} />
							<ContactInput inputname="phone" label="Mobile Number" type="text" inputDisabled={this.state.inputDisabled}
								placeholder="000-000-0000" value={this.state.contact.phone} pattern="\d{3}[\-]\d{3}[\-]\d{4}" onChange={this.setInputValue}/>
						</div>
						<div className="photo-input f-left">
							<figure className="photo"></figure>
							<button className="btn btn-large center" type='button'>Upload Image</button>
						</div>
					</div>

					<div className="actionbtn-div clear">
						<button className="btn btn-large" type='button' onClick={this.cancelChanges} disabled={this.state.inputDisabled}>Cancel</button>
						<button className="btn btn-large" onClick={this.checkInput} disabled={this.state.inputDisabled}>Save</button>
					</div>
				</form>
			</section>
		)
	}
});

module.exports = ContactForm;