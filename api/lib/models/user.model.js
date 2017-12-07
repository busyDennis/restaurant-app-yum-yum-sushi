// const crypto                = require('crypto');
// const mongoose              = require('mongoose');  
// const Schema                = require('mongoose').Schema;

module.exports = function(crypto, mongoose) {
  var userSchema = new mongoose.Schema({
    email: {
      type:           String,
      required:       true,
      unique:         true
    },
    hash:             String,
    salt:             String
  });

/**
  Example: https://www.sitepoint.com/user-authentication-mean-stack/
  */
  userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  };

/**
  Example from https://www.sitepoint.com/user-authentication-mean-stack/
  */
  userSchema.methods.validatePassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512'). toString('hex');
    return (this.hash === hash);
  };

  var User = mongoose.model('User', userSchema);

  return User;
};

