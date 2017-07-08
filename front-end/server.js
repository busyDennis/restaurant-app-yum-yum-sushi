var connect = require('connect');
var opn = require('opn');

connect().listen(8080, function() {
  console.log('Server running on 8080...');
});

//use(serveStatic(__dirname, {'index': ['index.html']})).

opn('/', { app: process.argv[2] });