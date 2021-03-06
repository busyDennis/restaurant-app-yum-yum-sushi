const bodyParser              = require('body-parser');
const braintree               = require('braintree');
const cookieParser            = require('cookie-parser');
const cors                    = require('cors');
const crypto                  = require('crypto');
const express                 = require('express');
const expressValidator        = require('express-validator');
//const forceSSL              = require('express-force-ssl');
const fs                      = require('fs');
const httpServer              = require('http-server');
const localStrategy           = require('passport-local').Strategy;
const mongoose                = require('mongoose');
const morgan                  = require('morgan');
var   passport                = require('passport');
// const passportSocketIO      = require('passport.socketio');
const path                    = require('path');
const session                 = require('express-session');
// const nodeStatic            = require('node-static');
// const socketIOmodule        = require('socket.io');

require('dotenv').config();

const MongoStore            = require('connect-mongo')(session);

var app                     = express();

console.log("path.join(__dirname, '../src'):");
console.log(path.join(__dirname, '../src'));

//serving static folders
//var file = new(static.Server)('../src');

app.use('/', express.static(path.join(__dirname, '../src')));
app.use('/bower_components',  express.static(path.join(__dirname, '../bower_components')));


// app.set("NODE_ENV", "development");


var router                  = express.Router();

console.log("NODE_ENV:");
console.log(process.env.NODE_ENV);


// Environment-specific configuration set-up:
const nodeEnvConfigObj      = require('./lib/config/env.config')();


// TEST: configuration object logged:
console.log("nodeEnvConfigObj:");
console.log(nodeEnvConfigObj);


// Logger set-up:
var accessLogStream         = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {
    flags: 'a'
  });

var loggerMorgan = morgan('combined', {
    stream: accessLogStream
  });

app.use(loggerMorgan);


mongoose.Promise = global.Promise; // we should avoid deprecated promise library exception in Mongoose

// Mongoose connection set-up:
mongoose.connect(nodeEnvConfigObj.DB_URL, { useMongoClient: true }, function(error, db) {
    if (! error) {
      console.log("Connection with \'" + nodeEnvConfigObj.DB_URL + "\' established successfully.");
    } else
      console.log("Connection with \'" + nodeEnvConfigObj.DB_URL + "\' could not be established; error message: " + error);
  }); //.then(function(resp) {}, function(error) {});

// Session store set-up:
var sessionStore = new MongoStore({
    collection:               'sessions',
    mongooseConnection:       mongoose.connection,
    url:                      nodeEnvConfigObj.DB_URL
  });

var sessionOpts = {
    cookie: {
        httpOnly:             false,
        maxAge:               3600000,
        secure:               false //true
      },
    resave:                   true, //automatically write to the session store
    saveUninitialized:        true, //save new sessions
    secret:                   'secret',
    store:                    sessionStore
  };

// TEST: sessionOpts.secret
console.log("TEST: sessionOpts.secret: " + sessionOpts.secret);

// Body parser set-up
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "1000000" })); // body size limit 1000000 bytes

// Enforce SSL protocol
// app.use(forceSSL);

// Cookie parser set-up
app.use(cookieParser('secret'));

// Session set-up
app.use(session(sessionOpts));



// //Testing session configuration:
// app.use(function(request, response, next) {
//   console.log("+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+");
//   console.log("Session:");
//   console.log(request.session);
//   console.log("Cookies:");
//   console.log(request.cookies);
//   console.log("User:");
//   console.log(request.user);
//   console.log("-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-");
//   next();
// });


// Render index.html everywhere except api routes
app.use('/!(api)', function(req, res) {
  res.sendFile(path.join(__dirname, '../src', 'index.html'));
});


// Importing MongoDB models:
const User                  = require('./lib/models/user.model')(crypto, mongoose);
const Image                 = require('./lib/models/image.model');
const FoodItem              = require('./lib/models/food.item.model');
const OrderItems            = require('./lib/models/order.items.model');
const OrderAddress          = require('./lib/models/order.address.model');


// PassportJS set-up:
passport                    = require('./lib/config/passport.config')(passport, localStrategy, User);


// Passport set-up
app.use(passport.initialize());
app.use(passport.session());


// REST controllers:
var authCtrl                = require('./lib/controllers/authentication.controller')(passport, User);
var imageCtrl               = require('./lib/controllers/image.controller')(fs, Image);
var foodItemCtrl            = require('./lib/controllers/food.item.controller')(Image, FoodItem);
var orderCtrl               = require('./lib/controllers/order.controller')(OrderItems, OrderAddress, braintree);


// CORS set-up:
var corsOptions = {
  origin:                   true,
  allowedHeaders:           'Origin,Content-Type,X-Requested-With, X-HTTP-Method-Override,Accept,Access-Control-Allow-Origin',
  credentials:              true, 
  methods:                  'GET,PUT,POST,DELETE,OPTIONS',
  //optionsSuccessStatus:   200,
  preflightContinue:        false
};


app.use(cors(corsOptions));


// Using "cors" npm package somehow did not suffice, and this code was added with the same purpose of preventing CORS ussues:
router.all('/api', function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  response.header("Access-Control-Allow-Headers", "*");
  response.header("Access-Control-Allow-Credentials", "true");
  next();
});


// Express validator configuration:
app.use(expressValidator());


// REST routes defined:
router.get('/api/img/:id', imageCtrl.GetImageById);
router.post('/api/img', authCtrl.isLoggedIn, imageCtrl.PostImage);
router.delete('/api/img/:id', imageCtrl.DeleteImage);

router.get('/api/food-items', foodItemCtrl.GetAllFoodItems);
router.get('/api/food-items/:id', foodItemCtrl.GetFoodItemById);
router.post('/api/food-items', authCtrl.isLoggedIn, foodItemCtrl.PostFoodItems);
router.put('/api/food-items/:id', foodItemCtrl.UpdateFoodItem);
router.delete('/api/food-items/:id', foodItemCtrl.DeleteFoodItem);

router.get('/api/order/items', orderCtrl.GetCurrentOrderItems);
router.post('/api/order/items', orderCtrl.PostCurrentOrderItems);
router.get('/api/order/address', orderCtrl.GetCurrentOrderAddress);
router.post('/api/order/address', orderCtrl.PostCurrentOrderAddress);
router.post('/api/order/payment', orderCtrl.PostPayment);

router.delete('/api/order', orderCtrl.DeleteCurrentOrder);

/*
/api/order DELETE - delete current order
/api/order/items GET POST
/api/order/address GET POST
/api/order/payment POST
*/



router.post('/api/register', authCtrl.PostRegister);
router.post('/api/log-in', authCtrl.PostLogIn);
router.post('/api/log-out', authCtrl.PostLogOut);
router.get('/api/authenticated-user', authCtrl.GetAuthenticatedUserData);
router.post('/api/purge-user', authCtrl.isLoggedIn, authCtrl.PurgeUser);

// var server = https.createServer(nodeEnvConfigObj.srv_opt, app);

// SSL socket
// var socketDotIO = socketIOmodule(server);

// socketDotIO.use(passportSocketIO.authorize({
//     key:                    nodeEnvConfigObj.key,
//     secret:                 'secret',
//     store:                  sessionStore,
//     passport:               passport,
//     cookieParser:           cookieParser
//   }));

// socketDotIO.on('connection', function(client) {
//     client.on('event', function(data) {});
//     client.on('disconnect', function() {});
//   });




console.log("process.env.PORT:");
console.log(process.env.PORT);

console.log("nodeEnvConfigObj.PORT:");
console.log(nodeEnvConfigObj.PORT);



// Server listening on port
var server = app.listen(process.env.PORT || nodeEnvConfigObj.PORT, function() {
    console.log('API server listening on port: ', server.address().port);
  });

// redirect all http requests to https
// app.use(function(req, res, next) {
//   if(! req.secure) {
//     return res.redirect(['http://127.0.0.1:' + nodeEnvConfigObj.srv_opt.port, req.url].join(''));
//   }
//   next();
// });

//keep this line in the end
app.use('/', router);

module.exports = server;


// Inserting data mock-ups
// JSON.parse(dataFoodItems).forEach(function(itemData) {
//   createFoodItemFromJSON(itemData).save();
// });

// FoodItem.collection.insertMany(JSON.parse(dataFoodItems), function(error, response) {
//   if (error)
//     console.log(error);
// });

// var dataFoodItems = fs.readFileSync(path.join(process.env.DB_SETUP_DATA_DIR_NAME, process.env.DB_SETUP_JSON_FILE_NAME), 'utf8');

// app.use(function(request, response, next) {
//   response.header("Access-Control-Allow-Credentials", "true");
//   response.header("Access-Control-Allow-Origin", "*");
//   response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   response.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });