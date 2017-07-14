const fs                              = require('fs');

const HEROKU_DB_URL                   = "mongodb://heroku_653zr90c:vq0un6e3t9b6dkf4i2tplq9fdh@ds129459.mlab.com:29459/heroku_653zr90c";

const LOCAL_DEV_DB_URL                = "mongodb://127.0.0.1:27017/restaurant_db";
const LOCAL_TEST_DB_URL               = "mongodb://127.0.0.1:27017/restaurant_test_db";

var getEnvConfigSettings = function() {
  var configObj = {};

  configObj.srv_opt = {
    //key:                            fs.readFileSync("./lib/config/ssl_cert/key.pem"),
    //cert:                           fs.readFileSync("./lib/config/ssl_cert/server.crt"),
    port:                           5000
    //requestCert:                true
    //rejectUnauthorized:     false
  };

  switch(process.env.NODE_ENV) {
    case 'development':
      configObj.db_url = LOCAL_DEV_DB_URL;
      break;
    case 'test':
      configObj.db_url = 'mongodb://heroku_653zr90c:vq0un6e3t9b6dkf4i2tplq9fdh@ds129459.mlab.com:29459/heroku_653zr90c';
      break;
    default:
      configObj.db_url = null;
      configObj.info = 'error: process.env.NODE_ENV value \'' + process.env.NODE_ENV + '\' not recognized.';
  }

  return configObj;
};

module.exports = getEnvConfigSettings;