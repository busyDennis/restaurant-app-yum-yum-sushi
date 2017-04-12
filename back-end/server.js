// <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>

const DB_SETUP_DATA_DIR = "setup_data";
const DB_SETUP_JSON_FILE = "dataFoodItems.json";

var cors          = require('cors');
var bodyParser    = require('body-parser');
var express       = require('express');
var morgan        = require('morgan');
var fs            = require('fs');
var mongoose      = require('mongoose');
var path          = require('path');

var app = express();
var router = express.Router();

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

var loggerMorgan = morgan('combined', {
    stream: accessLogStream
  });

app.use(cors());
app.use(function(request, response, next) {
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


mongoose.Promise = global.Promise; //hack to avoid deprecated promise library exception

mongoose.connect("mongodb://localhost:27017/foodDB", function(error, db) {
    if (! error) {
      console.log("MongoDB connection established successfully.");
  }
});


//DB models defined
var imageSchema = new mongoose.Schema({
    file_name:      String,
    data:           Buffer,
    content_type:   String
  });

var foodItemSchema = new mongoose.Schema({
    name:           String,
    description:    String,
    price:          String,
    portion_name:   String,
    img_fname:      String
    //img_id:         mongoose.Schema.Types.ObjectId
  });

var Image = mongoose.model('Image', imageSchema);

var FoodItem = mongoose.model('FoodItem', foodItemSchema);


//inserting data mock-ups

// JSON.parse(dataFoodItems).forEach(function(itemData) {
//   createFoodItemFromJSON(itemData).save();
// });


// FoodItem.collection.insertMany(JSON.parse(dataFoodItems), function(error, response) {
//   if (error)
//     console.log(error);
// });


//REST routes defined

router.all('/*', function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  response.header("Access-Control-Allow-Headers", "*");
  next();
});

router.get('/img', GetImage);
router.post('/img', PostImage);

router.get('/foodItems', GetFoodItem);
router.post('/foodItems', PostFoodItems);


//test
// router.param('fname', function (req, res, next, id) {
//   console.log('CALLED ONLY ONCE');
//   next();
// });


//REST controller methods

function GetImage(request, response) {
  //testing:
  //console.log("/img GET route hit!");
  // console.log(request.query);

  Image.find({ file_name: request.query.fname }).exec(function(error, retrievedObject) {
    console.log("Image BSON found:");
    console.log(retrievedObject);

    //retObj[0].data = new Buffer(retObj[0].data).toString('base64'); //retObj[0].data;//.toString('base64');

    var returnObject = {
      file_name:      retrievedObject[0].file_name,
      data:           new Buffer(retrievedObject[0].data).toString('base64'),
      content_type:   retrievedObject[0].content_type
    };

    //console.log("Return object:");
    //console.log(returnObject);


    //var temp = new Buffer(retrievedObject[0].data).toString('base64');
    //console.log(temp);

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

  //console.log("Image saved successfully.");

  response.status(201).json(image); //created
}

function GetFoodItem(request, response) {
  FoodItem.find({


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

//keep this in the end
app.use('/', router);


/*
//Fake JSON objects for testing POST routes

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