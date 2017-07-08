var connect = require('connect');
var opn = require('opn');

connect().use(serveStatic(__dirname, {'index': ['index.html']})).listen(8080, function() {
  console.log('Server running on 8080...');
});

opn('https://hidden-plateau-18437.herokuapp.com:8080', { app: process.argv[2] });