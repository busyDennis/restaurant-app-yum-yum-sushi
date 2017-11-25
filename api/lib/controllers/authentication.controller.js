module.exports = function(passport, User) {
  var thisModuleObj = {};

  thisModuleObj.PostRegister = function(request, response, next) {
    console.log("Registering user: " + request.body.email);

    var user = new User();
    user.email = request.body.email;
    user.setPassword(request.body.password);

    var promise = user.save(function (error, user, numAffected) {
      if (err) {
        return response.status(400).json("Internal error; could not save user model.");
      } else 
        return response.status(200).json(user);
    });
  };


  thisModuleObj.PostLogIn = function(request, response, next) {
    console.log("Log in POST request received."); //TESTING
    console.log(request.body); //TESTING

    console.log("Inside PostLogIn - request.session:");
    console.log(request.session);
    console.log("Inside PostLogIn - request.user:");
    console.log(request.user);

    request.check('email', 'Email field is empty!').notEmpty();
    request.check('password', 'Password field is empty!').notEmpty();

    var errors = request.validationErrors();

    if (errors) {
      return response.status(400).json(errors);
    }

    var retObj = passport.authenticate(
      'local',
      function(error, user, info) {
        console.log("error"); //TESTING
        console.log(error); //TESTING

        console.log("user"); //TESTING
        console.log(user); //TESTING

        console.log("info"); //TESTING
        console.log(info); //TESTING

        if (error) {
          return response.status(400).json({ error: error });
        }

        if (! user) {
          return response.status(404).json(info);
        }

        request.logIn(user, function(err) {
          console.log("User logged in successfully: ");
          console.log(request.user);

          if (err) {
            return response.status(401).json({ error: error });
          }
          
          return response.status(200).json({ user: request.user });
        });
      })(request, response, next);
  };


  thisModuleObj.PurgeUser = function(request, response, next) {
    console.log("\'Purge User\' POST request received."); //TESTING
    console.log(request.body); //TESTING

    request.check('email', 'Email field is empty!').notEmpty();
    request.check('password', 'Password field is empty!').notEmpty();

    var errors = request.validationErrors();

    if (errors) {
      return response.status(400).json(errors);
    }

    var retObj = passport.authenticate(
      'local',
      function(error, user, info) {
        // console.log("error"); //TESTING
        // console.log(error); //TESTING

        // console.log("user"); //TESTING
        // console.log(user); //TESTING

        // console.log("info"); //TESTING
        // console.log(info); //TESTING

        if (error) {
          return response.status(400).json({ error: error });
        }

        if (! user) {
          return response.status(404).json(info);
        }

        console.log("User:");
        console.log(user);


        User.find({
                    _id: user._id
                  }).remove().exec();

        return response.status(200).json("");
      })(request, response, next);

    return response.status(200).json("");
  };


  thisModuleObj.UserAuthenticated = function(request, response, next) {
    if(request.user) {
      return next();
    } else 
      return response.status(401).json({
          error: 'User not authenticated'
        });
  };

  return thisModuleObj;
};