'use strict';

var Dispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../dispatcher/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var ContactDataStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	}
});

Dispatcher.register(function(payload) {
	switch(payload.actionType) {
		case ActionTypes.DELETE_CONTACT:
			ContactDataStore.emitChange();
			break;
		case ActionTypes.EDIT_CONTACT:
			ContactDataStore.emitChange();
			break;
		case ActionTypes.ADD_CONTACT:
			ContactDataStore.emitChange();
			break;
		default:
			// does nothing
	}
});


module.exports = ContactDataStore;