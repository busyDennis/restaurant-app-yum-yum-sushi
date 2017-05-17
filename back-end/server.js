/*
  Note: user authentication example was taken from:
  https://www.sitepoint.com/user-authentication-mean-stack/
*/


const DB_SETUP_DATA_DIR     = "setup_data";
const DB_SETUP_JSON_FILE    = "dataFoodItems.json";

const bodyParser            = require('body-parser');
const cors                  = require('cors');
const crypto                = require('crypto');
const express               = require('express');
const fs                    = require('fs');
const jwt                   = require('jsonwebtoken');
const LocalStrategy         = require('passport-local').Strategy;
const mongoose              = require('mongoose');
const morgan                = require('morgan');
const passport              = require('passport');
const path                  = require('path');



var app = express();
var router = express.Router();

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

var loggerMorgan = morgan('combined', {
    stream: accessLogStream
  });

app.use(cors());
app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Credentials", "true");
  response.header("Access-Control-Allow-Origin", "*");
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  response.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(loggerMorgan);

var dataFoodItems = fs.readFileSync(DB_SETUP_DATA_DIR + '/' + DB_SETUP_JSON_FILE, 'utf8');

//app.use(express.static());  //static folder
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.Promise = global.Promise; //hack used to avoid deprecated promise library exception

mongoose.connect("mongodb://localhost:27017/foodDB", function(error, db) {
  if (! error) {
    console.log("MongoDB connection established successfully.");
  }
});


//DB models defined
var imageSchema = new mongoose.Schema({
    file_name:        String,
    data:             Buffer,
    content_type:     String
  });

var foodItemSchema = new mongoose.Schema({
    name:             String,
    description:      String,
    price:            String,
    portion_name:     String,
    img_fname:        String
    //img_id:         mongoose.Schema.Types.ObjectId
  });

/**
  Example from https://www.sitepoint.com/user-authentication-mean-stack/
*/
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
  Example from https://www.sitepoint.com/user-authentication-mean-stack/
*/
userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

/**
  Example from https://www.sitepoint.com/user-authentication-mean-stack/
*/
userSchema.methods.validatePassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return (this.hash === hash);
};

var Image = mongoose.model('Image', imageSchema);

var FoodItem = mongoose.model('FoodItem', foodItemSchema);

var User = mongoose.model('User', userSchema);


passport.use(new LocalStrategy({
    usernameField:    'email',
    passwordField:    'password',
    session:          false
  }, 
  function(email, password, next) {
    console.log("Inside passport.authenticate");
    console.log("Email:");
    console.log(email);

    User.find({ email: email }, function (error, users) {
      if (error) {
        return next(null, {
                            error:      true, 
                            message:    error
                          });
      }

      if (! users) 
        return next(null, {
                            error:      true, 
                            message:    'Incorrect email.'
                          });
      var user = users[0];
      //console.log("User found:"); //TESTING
      //console.log(user); //TESTING

      if (! user.validatePassword(password)) {
        return next(null, { 
                            error:      true,
                            message: 'Incorrect password.'
                          });
      }
      
      return next(null, {
                          error:      false, 
                          model:      user
                        });
      
    });
  }));


//Inserting data mock-ups

// JSON.parse(dataFoodItems).forEach(function(itemData) {
//   createFoodItemFromJSON(itemData).save();
// });


// FoodItem.collection.insertMany(JSON.parse(dataFoodItems), function(error, response) {
//   if (error)
//     console.log(error);
// });


router.all('/*', function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  response.header("Access-Control-Allow-Headers", "*");
  next();
});


//REST routes defined

router.get('/img', GetImage);
router.post('/img', PostImage);

router.get('/foodItems', GetFoodItem);
router.post('/foodItems', PostFoodItems);

router.post('/register', PostRegister);
router.post('/login', PostLogIn);
// router.get('/profile/:usr_id', GetUserProfile);

// router.param('fname', function (req, res, next, id) {
//   console.log('CALLED ONLY ONCE');
//   next();
// });


//REST controller route handlers

function PostRegister(request, response) {
  console.log("Registering user: " + request.body.email);

  var user = new User();

  user.email = request.body.email;
  user.setPassword(request.body.password);
  user.save();

  response.status(200).json(user);

  // user.save(function(error) {
  //   var jwt;
  //   jwt = user.generateJwt();
  //   response.status(200);
  //   response.json({
  //     "jwt" : jwt
  //   });
  // });
};

function PostLogIn(request, response) {
  //console.log("Log in POST request received."); //TESTING
  //console.log(request.body); //TESTING

  var retObj = passport.authenticate(
    'local',
    {
      // successRedirect: '/admin'
    },
    function(req, res) {
      // console.log("res"); //TESTING
      // console.log(res); //TESTING

      response.status(200).json(res.model); //.redirect('/admin');;
    })(request, response);
}


  // passport.authenticate('local', function(error, user, info) {
  //   var jwt;

  //   if(error) {
  //     response.status(404).json(error);
  //     return;
  //   }

  //   //If the user is found
  //   if(user) {
  //     jwt = user.generateJwt();
  //     response.status(200);
  //     response.json({
  //       "jwt" : jwt
  //     });
  //   } else {
  //     // If the user is not found
  //     response.status(401).json(info);
  //   }
  // })(request, response, next);


// function GetUserProfile(request, response) {}


function GetImage(request, response) {
  Image.find({ file_name: request.query.fname }).exec(function(error, retrievedObject) {
    console.log("Image BSON retrieved from the database:");
    console.log(retrievedObject);

    var returnObject = {
      file_name:      retrievedObject[0].file_name,
      data:           new Buffer(retrievedObject[0].data).toString('base64'),
      content_type:   retrievedObject[0].content_type
    };

    if (! error) {
      response.status(200).json(returnObject);
    } else {
      console.log(error);
      return response.send(404);
    }
  });

  response.status(200);
}


function PostImage(request, response) {
  console.log("Image POST request received.");
  console.log(request.body);

  var image = new Image();
  image.file_name = request.body.file_name;
  image.data = fs.readFileSync(DB_SETUP_DATA_DIR + '/img/' + image.file_name);
  image.content_type = request.body.content_type; //improve this
  image.save();

  response.status(201).json(image);
}


function GetFoodItem(request, response) {
  FoodItem.find({
    //TO DO: implement the search criterion



  }).exec(function(error, result) {
    console.log("Result:");
    console.log(result);

    if (! error)
      response.send(result);
    else
      console.log(error);
  });
}


function PostFoodItems(request, response) {
  console.log("POST request successful:");
  console.log(request.body); //test

  var foodItem = createFoodItemFromJSON(request.body);

  var image = Image.findOne({
      "file_name": foodItem.img_fname
    }).then(function(result) {
      console.log(result);
      
    }, function(error) {
      console.log(error);
    });

  foodItem.save();

  response.status(200);
}


var server = app.listen(5000, function() {
  console.log('Listening on port ', server.address().port)
});


function createFoodItemFromJSON(foodItemData) {
  var foodItem = new FoodItem();
  foodItem.name = foodItemData.name;
  foodItem.description = foodItemData.description;
  foodItem.portion_name = foodItemData.portion_name;
  foodItem.img_fname = foodItemData.img_fname;

  var image = Image.findOne({
      "file_name": foodItemData.img_fname
    }).then(function(result) {
      //console.log("image obtained from file \"" + foodItemData.img_fname + "\" found!");
      //console.log(result);

      //foodItem.img_id = result._id
    }, function(error) {
      console.log(error);
    });

  return foodItem;
}

//keep this line in the end
app.use('/', router);


/*
//JSON objects for testing POST routes

{
  "file_name":      "spicy_salmon.png",
  "content_type":    "image/png"
}


{
  "name":           "Spicy Salmon Roll",
  "description":    "Spicy, juicy, fresh salmon, avocado, and cream cheeze.",
  "price":          "8.50",
  "portion_name":   "12 pcs",
  "img_fname":      "spicy_salmon.png"
}


[
  {
    _id: 58d9c04e4127275aecb4a1e0,
    contentType: 'image/png',
    data:
     Binary {
       _bsontype: 'Binary',
       sub_type: 0,
       position: 55625,
       buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 01 90 00 00 01 90 08 03 00 00 00 b7 61 c6 fe 00 00 03 00 50 4c 54 45 ee e3 ca d4 c8 b9 e8 d3 b9 ... > },
    file_name: 'spicy_salmon.png',
    __v: 0
  }
]

*/