const chai                            = require('chai');
const chaiHttp                        = require('chai-http');
const mocha                           = require('mocha');
const mongoose                        = require("mongoose");
const server                          = require('../server');

const User                            = require('../lib/models/user.model');
const authCtrl                        = require('../lib/controllers/authentication.controller');

//Stubs:
const EMAILS                          = ["", "alterego@hotmail.com", "selfless_mother@hotmail.com"];
const PASSWORDS                       = ["", "egomaniac", "b*tch"];


var should = chai.should();
chai.use(chaiHttp);

describe("Authorization flow", function() {

  describe("Registration/de-registration subflow", function() {

    describe('/register POST', () => {

      //clean-up: purge user stub
      after(function() {
        chai.request(server)
          .post('/purge-user')
          .send({
              email:                  EMAILS[1],
              password:               PASSWORDS[1]
            });
        });

      it('should register user and verify successful log-in attempt', (done) => {
        chai.request(server)
          .post('/register')
          .send({
              email:                  EMAILS[1],
              password:               PASSWORDS[1]
            })
          .end(function (error, response) {
             response.should.have.status(200);

             chai.request(server)
              .post('/log-in')
              .send({
                  email:                EMAILS[1],
                  password:             PASSWORDS[1]
                })
              .end(function (error, response) {
                 response.should.have.status(200);
                 done();
              });
            });
      });
    });

    describe('/purge-user POST', () => {

      //pre-register user stub
      before(function() {
        chai.request(server)
          .post('/register')
          .send({
              email:                  EMAILS[1],
              password:               PASSWORDS[1]
            });
      });

      it('should purge user and verify 200 response code', (done) => {
        chai.request(server)
          .post('/purge-user')
          .send({
              email:                  EMAILS[1],
              password:               PASSWORDS[1]
            })
          .end(function (error, response) {
             response.should.have.status(200);
             done();
          });
        });
    });

  });

  describe("Authentication subflow", function() {

    //pre-register user stub
    before(function() {
      chai.request(server)
        .post('/register')
        .send({
            email:                  EMAILS[1],
            password:               PASSWORDS[1]
          });
      });

    describe("Logging user in", function() {

      describe('/log-in POST', () => {

        it('should verify the 400 HTTP response status when both email and password fields are empty', (done) => {
          chai.request(server)
            .post('/log-in')
            .send({
              email:                EMAILS[0],
              password:             PASSWORDS[0]
            })
            .end(function (error, response) {
               //expect(error).to.be.null;
               response.should.have.status(400);
               done();
            });
          });

        it('should verify the 404 HTTP response status when user model does not exist in the database, and could not be retreived', (done) => {
          chai.request(server)
            .post('/log-in')
            .send({
              email:                EMAILS[2],
              password:             PASSWORDS[2]
            })
            .end(function (error, response) {
               //expect(error).to.be.null;
               response.should.have.status(404);
               done();
            });
          });

        it('should verify the 200 HTTP response status upon successful log-in attempt for existing user', (done) => {
          chai.request(server)
            .post('/log-in')
            .send({
              email:                EMAILS[1],
              password:             PASSWORDS[1]
            })
            .end(function (error, response) {
               //expect(error).to.be.null;
               response.should.have.status(404);
               done();
            });
          });

      });

    });

  });

});