var connect = require('connect');
var serveStatic = require('serve-static');
var opn = require('opn');

connect().use(serveStatic(__dirname, {'index': ['index.html']})).listen(8080, function() {
  console.log('Server running on 8080...');
});

opn('http://127.0.0.1:8080', {app: 'firefox'});