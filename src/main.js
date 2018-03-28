"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var StartPage = require('./components/startpage');

var appContainer = document.getElementById('app');

var MainPage = React.createClass({
	render: function() {
		return <StartPage />
	}
});

ReactDOM.render( <MainPage />, appContainer);




