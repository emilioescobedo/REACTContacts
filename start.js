'use strict';

var express = require('express');
var app = express();
var parser = require('body-parser');


var port = 5000;

app.use(express.static('dist'));

app.listen(port, function(err) {
	console.log('running server on http://localhost:' + port);
});

app.get('/', function(req, res) {
	res.render('index');
});


app.use(parser.json());
app.use(parser.urlencoded({ extended: true}));
