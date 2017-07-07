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
      configObj.db_url = 'mongodb://heroku_653zr90c:vq0un6e3t9b6dkf4i2tplq9fdh@ds129459.mlab.com:29459/heroku_653zr90c';

      //'mongodb://heroku_653zr90c:<dbpassword>@ds129459.mlab.com:29459/heroku_653zr90c/restaurant_db';
      break;
    case 'test':
      configObj.db_url = 'mongodb://heroku_653zr90c:vq0un6e3t9b6dkf4i2tplq9fdh@ds129459.mlab.com:29459/heroku_653zr90c';
      //'mongodb://<dbuser>:<dbpassword>@ds129459.mlab.com:29459/heroku_653zr90c/restaurant_test_db';
      break;
    default:
      configObj.db_url = null;
      configObj.info = 'error: process.env.NODE_ENV value \'' + process.env.NODE_ENV + '\' not recognized.';
  }

  return configObj;
};

module.exports = getEnvConfigSettings;