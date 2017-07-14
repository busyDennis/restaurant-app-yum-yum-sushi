'use strict';
var fs = require('fs');
fs.createReadStream('.restaurant-env')
  .pipe(fs.createWriteStream('.env'));