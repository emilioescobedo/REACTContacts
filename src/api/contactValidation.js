'use strict';

var ContactValidation = {
	init: function(contactForm) {
		this.contactForm = contactForm;

		this.phoneInput = contactForm.querySelector('input.phone');
		this.phoneMessage = 'Please use this format for your phone number: XXX-XXX-XXXX';

		this.dateInput = contactForm.querySelector('input.birthday');
		this.dateMessage = 'Please use this format for your date: DD/MM/YYYY'

	},
	_patternCheck: function(ele, message) {
		if (ele.validity.patternMismatch) {
			ele.setCustomValidity(message);
		} else {
			ele.setCustomValidity("");
		}
	},
	checkInput: function(evt) {
		this._patternCheck(this.phoneInput, this.phoneMessage);
		this._patternCheck(this.dateInput, this.dateMessage);

	}
};


module.exports = ContactValidation;