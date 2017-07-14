const bodyParser            = require('body-parser');
const cookieParser          = require('cookie-parser');
const cors                  = require('cors');
const dotenv                = require('dotenv');
const express               = require('express');
const httpServer            = require('http-server');
const session               = require('express-session');
const expressValidator      = require('express-validator');
//const forceSSL              = require('express-force-ssl');
const fs                    = require('fs');
const mongoose              = require('mongoose');
const morgan                = require('morgan');
const passport              = require('passport');
const localStrategy         = require('passport-local').Strategy;
// const passportSocketIO      = require('passport.socketio');
const MongoStore            = require('connect-mongo')(session);
const path                  = require('path');
// const socketIOmodule        = require('socket.io');

const User                  = require('./lib/models/user.model');
const Image                 = require('./lib/models/image.model');
const FoodItem              = require('./lib/models/food.item.model');


//passport config
passport                    = require('./lib/config/passport.config')(passport, localStrategy, User);



//controllers
var imageCtrl               = require('./lib/controllers/image.controller');
var foodItemCtrl            = require('./lib/controllers/food.item.controller')(FoodItem);
var authCtrl                = require('./lib/controllers/authentication.controller')(passport, User);

var app                     = express();
var router                  = express.Router();

//configuration based on process.env.NODE_ENV value
const nodeEnvConfigObj      = require('./lib/config/env.config')();

console.log("nodeEnvConfigObj:");
console.log(nodeEnvConfigObj);


//dotenv npm module configuration
dotenv.config({
    path: '.restaurant-env'
  });
dotenv.load();

//logger configuration
var accessLogStream         = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {
    flags: 'a'
  });
var loggerMorgan = morgan('combined', {
    stream: accessLogStream
  });
app.use(loggerMorgan);


//mongoose connection set-up
mongoose.Promise = global.Promise; //hack used to avoid deprecated promise library exception
mongoose.connect(nodeEnvConfigObj.db_url, { useMongoClient: true }, function(error, db) {
    if (! error) {
      console.log("Connection with \'" + nodeEnvConfigObj.db_url + "\' established successfully.");
    } else
      console.log("Connection with \'" + nodeEnvConfigObj.db_url + "\' could not be established; error message: " + error);
  });


//session store set-up
var sessionStore = new MongoStore({
    collection:               'sessions',
    mongooseConnection:       mongoose.connection,
    url:                      nodeEnvConfigObj.db_url
  });


var sessionOpts             = {
    cookie: {
        httpOnly:             false,
        maxAge:               3600000,
        secure:               false//true
      },
    resave:                   true, //automatically write to the session store
    saveUninitialized:        true, //save new sessions
    secret:                   'secret',
    store:                    sessionStore
  };


console.log("sessionOpts.secret: " + sessionOpts.secret);


//body parser set-up
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//enforce SSL protocol
//app.use(forceSSL);

//cookie parser set-up
app.use(cookieParser('secret'));

//session set-up
app.use(session(sessionOpts));

//passport set-up
app.use(passport.initialize());
app.use(passport.session());

// //TESTING
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


// Otherwise, render the index.html page
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../src', 'index.html'));
});


//CORS set-up
var corsOptions = {
  origin:                 true,
  allowedHeaders:         'Origin,Content-Type,X-Requested-With, X-HTTP-Method-Override,Accept,Access-Control-Allow-Origin',
  credentials:            true, 
  methods:                'GET,PUT,POST,DELETE,OPTIONS',
  //optionsSuccessStatus:   200,
  preflightContinue:      false
};

app.use(cors(corsOptions));


//recommended cors configuration did not suffice
router.all('/api/*', function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  response.header("Access-Control-Allow-Headers", "*");
  response.header("Access-Control-Allow-Credentials", "true");
  next();
});

//express validator configuration
app.use(expressValidator());


//REST routes defined
router.get('/api/img', imageCtrl.GetImage);
router.post('/api/img', imageCtrl.PostImage);

router.get('/api/food-items', foodItemCtrl.GetAllFoodItems);
router.post('/api/food-items', foodItemCtrl.PostFoodItems);

router.post('/api/register', authCtrl.PostRegister);
router.post('/api/log-in', authCtrl.PostLogIn);
router.post('/api/purge-user', authCtrl.PurgeUser);
router.get('/api/user-auth', authCtrl.UserAuthenticated);


//var server = https.createServer(nodeEnvConfigObj.srv_opt, app);

//SSL socket
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

//server listening on port
var server = app.listen(/*process.env.PORT || */ nodeEnvConfigObj.srv_opt.port, function() {
    console.log('Listening on port ', server.address().port);
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


//TO DO: use standard db setup approach

//Inserting data mock-ups
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