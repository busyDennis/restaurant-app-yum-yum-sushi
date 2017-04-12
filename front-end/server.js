var connect = require('connect');
var serveStatic = require('serve-static');
var opn = require('opn');
//var express = require('express');
var mongo = require('mongodb');


// var app = express();
// var server = app.listen(5000, function() {
//   console.log('Server running on 5000...');
// });


connect().use(serveStatic(__dirname, {'index': ['index.html']})).listen(8080, function() {
  console.log('Server running on 8080...');
});



opn('http://127.0.0.1:8080', {app: 'firefox'});