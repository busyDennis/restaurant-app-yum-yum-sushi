const fs                         = require('fs');

//const HEROKU_DB_URL              = "mongodb://heroku_653zr90c:vq0un6e3t9b6dkf4i2tplq9fdh@ds129459.mlab.com:29459/heroku_653zr90c";
const LOCAL_DEV_DB_URL           = "mongodb://10.137.3.16:27017/restaurant_db";  //"mongodb://127.0.0.1:27017/restaurant_db"; //"mongodb://127.0.0.1:27017/restaurant_db";
const LOCAL_TEST_DB_URL          = "mongodb://127.0.0.1:27017/restaurant_test_db";

var getEnvConfigSettings = function() {
  var configObj = {};

  // configObj.ssl_conf = {
    //key:                            fs.readFileSync("./lib/config/ssl_cert/key.pem"),
    //cert:                           fs.readFileSync("./lib/config/ssl_cert/server.crt"),
    
    //requestCert:                true
    //rejectUnauthorized:     false
  //};

  switch(process.env.NODE_ENV) {
    case "development":
      configObj.DB_URL   = LOCAL_DEV_DB_URL;
      configObj.PORT = 3000;
      break;
    case "test":
      configObj.DB_URL   = LOCAL_TEST_DB_URL;
      configObj.PORT = 3000;
      break;
    case "production":
      configObj.DB_URL   = process.env.DB_URL;
      configObj.PORT = process.env.PORT;
      break;
    default:
      configObj.DB_URL   = null;
      configObj.INFO     = 'error: process.env.NODE_ENV value \'' + process.env.NODE_ENV + '\' not recognized.';
  }

  return configObj;
};

module.exports = getEnvConfigSettings;