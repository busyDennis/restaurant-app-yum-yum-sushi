//const passport                = require('passport');
//const localStrategy           = require('passport-local').Strategy;
//const User                    = require('../models/user.model');

var PassportConfigModule = function(passport, localStrategy, User) {
  //Passport local strategy setup
  passport.use(new localStrategy({
      usernameField:    'email',
      passwordField:    'password'
    },//verify callback:
    function(email, password, next) {
      console.log("Inside passport.authenticate");  //TESTING
      console.log("email:");  //TESTING
      console.log(email);  //TESTING
      console.log("password:");  //TESTING
      console.log(password);  //TESTING

      User.find({ email: email }, function (error, users) {
        console.log("Inside passport verify callback - users object:");
        console.log(users);

        if (error) {
          console.log("Local auth strategy error");
          console.log(error);

          return next(error);
        }

        var user = users[0];

        if (user == null) {
                console.log("Passport local strategy: could not find user in the database.");


          return next(null,
                      false, {
                        message:    'The requested \'User\' model was not found in the database'
                      });
        }

        if (! user.validatePassword(password)) {
          console.log("Passport local strategy: invalid password.");

          return next(null, false, {
                              message: 'Incorrect password.'
                            });
        }
        
        console.log("Passport local strategy: success.");

        return next(null, user);
      });
    }));


  passport.serializeUser(function(user, done) {
    console.log("serializeUser: ", user);

    console.log("serializeUser - user id: ", user["_id"]);

     done(null, user["_id"]);
  });


  passport.deserializeUser(function(id, done) {
    console.log("deserializeUser - id: ", id);

    User.findById(id, function(err, user) {
      console.log("deserializeUser - user:", user);
      done(err, user);
    });
  });

  return passport;
};

module.exports = PassportConfigModule;