//Importing MongoDB models:
const User                  = require('./lib/models/user.model');
const Image                 = require('./lib/models/image.model');
const FoodItem              = require('./lib/models/food.item.model');

//PassportJS set-up:
passport                    = require('./lib/config/passport.config')(passport, localStrategy, User);

//REST controllers:
var imageCtrl               = require('./lib/controllers/image.controller');
var foodItemCtrl            = require('./lib/controllers/food.item.controller')(FoodItem);
var authCtrl                = require('./lib/controllers/authentication.controller')(passport, User);

var app                     = express();


