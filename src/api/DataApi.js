'use strict';
var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../dispatcher/actionTypes');
var Data = require('../../data/contacts.js');

// set initial contact data
if (!localStorage.hasOwnProperty('contacts')) {
	localStorage.setItem('contacts', JSON.stringify(Data));
}

var DataApi = {
	getContacts: function() {
		//must parse local Storage into js objects in order read it
		return JSON.parse(localStorage.contacts);
	},
	getSingleContact: function(selectedId) {
		var currentContacts = JSON.parse(localStorage.contacts);
		var singleContact;

		for (var i = 0; i < currentContacts.length; i++) {
			if (currentContacts[i].id === selectedId) {
				singleContact = currentContacts[i];
			}
        }
        return singleContact;
	},
	createContactId: function(storedContacts) {
		var contactIDs = storedContacts.map(function(ele,i) {
			return parseInt(ele.id)
		});
		var createdId = (Math.max.apply(null, contactIDs)) + 1;

		return createdId.toString();
	},
	addContact: function(newContact) {
		var storedContacts = JSON.parse(localStorage.contacts);

		var newId = this.createContactId(storedContacts);
		newContact.id = newId;
		storedContacts.push(newContact);

		localStorage.setItem('contacts', JSON.stringify(storedContacts));
		Dispatcher.dispatch({ actionType: ActionTypes.ADD_CONTACT });

		return newId;
	},
	editContact: function(selectedContact) {
		var storedContacts = JSON.parse(localStorage.contacts);

		for (var i = 0; i < storedContacts.length; i++) {
			if (storedContacts[i].id === selectedContact.id) {
				storedContacts.splice(i,1,selectedContact);
			}
        }
        localStorage.setItem('contacts', JSON.stringify(storedContacts));
		Dispatcher.dispatch({ actionType: ActionTypes.EDIT_CONTACT });

		alert("Changes have been saved");

	},
	deleteContact: function(selectedId) {
		var storedContacts = JSON.parse(localStorage.contacts);

		for (var i = 0; i < storedContacts.length; i++) {
			if (storedContacts[i].id === selectedId) {
				storedContacts.splice(i,1);
			}
        }
        localStorage.setItem('contacts', JSON.stringify(storedContacts));
		Dispatcher.dispatch({actionType: ActionTypes.DELETE_CONTACT});
	}
};


module.exports = DataApi;





