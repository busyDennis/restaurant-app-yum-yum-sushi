process.env.NODE_ENV = 'test';

const chai        = require('chai');
const chaiHttp    = require('chai-http');
const mongoose    = require("mongoose");
var   server      = require('../server');

mongoose.connect("mongodb://localhost:27017/restaurant_test_db", function(error, db) {
  if (! error) {
    console.log("Connection with \'restaurant_test_db\' established successfully.");
  }
});

var should = chai.should();
chai.use(chaiHttp);


describe("Restaurant app registration and authentication process", function() {

  describe('/register POST REST route', () => {
    it('', (done) => {

      
      done();
    });
  });

  describe('/login POST REST route', () => {
    it('should verify the 400 HTTP response status when email and password fields are empty', (done) => {
      chai.request(server)
        .post('/login')
        .send({ email: '', password: '' })
        .end(function (error, response) {
           //expect(error).to.be.null;
           response.should.have.status(400);
           done();
        });
    });
  });

});

