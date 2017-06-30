const fs                    = require('fs');

var getEnvConfigSettings = function() {
  var configObj = {};

  configObj.srv_opt = {
    key:                            fs.readFileSync("./lib/config/ssl_cert/key.pem"),
    cert:                           fs.readFileSync("./lib/config/ssl_cert/server.crt"),
    port:                           5000
    //requestCert:                true
    //rejectUnauthorized:     false
  };

  switch(process.env.NODE_ENV) {
    case 'development':
      configObj.db_url = 'mongodb://localhost:27017/restaurant_db';
      break;
    case 'test':
      configObj.db_url = 'mongodb://localhost:27017/restaurant_test_db';
      break;
    default:
      configObj.db_url = null;
      configObj.info = 'error: process.env.NODE_ENV value \'' + process.env.NODE_ENV + '\' not recognized.';
  }

  return configObj;
};

module.exports = getEnvConfigSettings;