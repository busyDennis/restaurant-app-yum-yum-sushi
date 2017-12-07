module.exports = function(passport, User) {
  var thisModuleObj = {};

  /**
    Register new user
  */
  thisModuleObj.PostRegister = function(request, response, next) {
    console.log("Inside /api/register POST route handler");

    var user = new User();
    user.email = request.body.email;
    user.setPassword(request.body.password);

    User.findOne({ email: user.email }, function(error, userObj) {
      if(userObj) {
        return response.status(200).json({ "Message": "User model with \'email\' property value \'" + user.email + "\' already exists in the database" });
      } else {
        user.save(function (error, user, numAffected) {
          if (error)
            return response.status(400).json(error);
          else 
            return response.status(201).json({ "id": user._id });
        });
      }
    });
  };


  /**
    Validate user credentials and grant access
  */
  thisModuleObj.PostLogIn = function(request, response, next) {
    console.log("Inside /api/log-in POST route handler.");
    // console.log(request.body);

    // console.log("Inside PostLogIn - request.session:");
    // console.log(request.session);
    // console.log("Inside PostLogIn - request.user:");
    // console.log(request.user);

    request.check('email', 'Email field is empty!').notEmpty();
    request.check('password', 'Password field is empty!').notEmpty();

    var errors = request.validationErrors();

    if (errors) {
      return response.status(400).json(errors);
    }

    var retObj = passport.authenticate(
      'local',
      function(error, user, info) {
        console.log("error"); 
        console.log(error); 

        console.log("user"); 
        console.log(user); 

        console.log("info"); 
        console.log(info); 

        if (error) {
          return response.status(400).json(error);
        }

        if (! user) {
          return response.status(404).json(info);
        }

        request.logIn(user, function(error) {
          console.log("User logged in successfully: ");
          console.log(request.user);

          if (error) {
            return response.status(401).json({ error: error });
          }
          
          return response.status(200).json({ user: request.user });
        });
      })(request, response, next);
  };

  /**
    Purge user authentication credentials
  */
  thisModuleObj.PurgeUser = function(request, response, next) {
    console.log("Inside /api/purge-user POST route handler."); 
    console.log(request.body); 

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
          error: 'User is not authenticated'
        });
  };

  return thisModuleObj;
};

// var myJSON = {
//     "Error message": {
//       "code": 11000,
//       "index": 0,
//       "errmsg": "insertDocument :: caused by :: 11000 E11000 duplicate key error index: restaurant_db.users.$email_1  dup key: { : \"a\" }",
//       "op": {
//         "hash":"9d5062842384efe5cc9ef764161da65d9720cd448813d527e64fefee77e5853d2af45ccf78890900868201f7765b7108117fe2b0a835230015a9c5450249dcf1",
//         "salt": "2651967a17729656658a1a7f603468f8",
//         "email": "a",
//         "_id": "5a29c441c2d92c1ac023353f",
//         "__v": 0
//       }
//     }
// };