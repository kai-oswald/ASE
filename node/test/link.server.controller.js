var expect = require("chai").expect;
var mongoose = require('mongoose');
require('../app/models/link.server.model');
var Link = mongoose.model("Link");
var link = require("../app/controllers/link.server.controller.js");
var httpMocks = require('node-mocks-http');
var url = require("url");

describe("Link Controller", function () {
  describe("Random Text Generator", function () {
    it("creates a 5 character random string", function () {
      var rnd = link.randomText();
      var rnd2 = link.randomText();
      expect(rnd.length).to.equal(5);
    });    
  });
});
  describe("Create Link Model", function () {
    it("creates an extended link model from shorter model", function () {
      var mock = { shortlink: "abcde", longlink: "https://google.de"};
      GLOBAL_SERVER = "localhost:3000";
      var model = link.createLinkModel(mock);
      expect(model.shortLink).to.equal("/abcde");
      expect(model.shortURL).to.equal("localhost:3000/abcde");
      expect(model.shortQR).to.equal("localhost:3000/qr/abcde");
      expect(model.longURL).to.equal("https://google.de");
      expect(model.longLink).to.equal("google.de");
    });    
  }); 
    
    describe("CheckLongLink test", function() {
        it("Premium and Systemurl", function() {
            var req = httpMocks.createRequest({body:{shortlink:'stats', longlink:'testt.de'}});
            var res = httpMocks.createResponse();
            GLOBAL_PREMIUM='true';
            var re = link.checkLongLink(req, res, function() {
                expect(res.error).to.equal(200); //gesetzt?
            });            
        });
    });   
    describe("CheckLongLink test", function() {
        it("Premium and no Systemurl", function() {
            var req = httpMocks.createRequest({body:{shortlink:'abcd', longlink:'testt.de'}});
            var res = httpMocks.createResponse();
            GLOBAL_PREMIUM='true';
            var re = link.checkLongLink(req, res, function() {
                expect(res.statusCode).to.equal(200);
            });
            
        });
    });   
    describe("CheckLongLink test", function() {
        it("No Premium", function() {
            var req = httpMocks.createRequest({body:{shortlink:'qweqe', longlink:'testt.de'}});
            var res = httpMocks.createResponse();
            GLOBAL_PREMIUM='false';
            var re = link.checkLongLink(req, res, function() {
                expect(res.statusCode).to.equal(200);
            });
            
        });
    });   
    
    describe("Link Controller", function () {
        describe("Check Short Link", function () {
            it("checks if shortlink already exists", function () {
                GLOBAL_SERVER = 'localhost:8001';
                GLOBAL_PREMIUM = true;
                var req = httpMocks.createRequest({body: {shortlink: 'abc', longlink: 'www.abc.de'}});
                var res = httpMocks.createResponse();
                link.create(req, res);
                link.checkShortLink(req, res);
                expect(res.statusCode).to.equal(200);
            });
        });
    });

describe("Link Controller", function () {
    describe("Check Short Link", function () {
        it("checks if shortlink is a new one", function () {
            GLOBAL_SERVER = 'localhost:8001';
            GLOBAL_PREMIUM = true;
            var req = httpMocks.createRequest({body: {shortlink: 'abc', longlink: 'www.abc.de'}});
            var res = httpMocks.createResponse();
            link.checkShortLink(req, res);
            expect(res.statusCode).to.equal(200);
        });
    });
});