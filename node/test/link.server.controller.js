var expect    = require("chai").expect;
var link = require("../app/controllers/link.server.controller.js");
var httpMocks = require('node-mocks-http');

describe("Link Controller", function() {
  describe("Random Text Generator", function() {
    it("creates random string", function() {
      var rnd = link.randomText();
      expect(rnd.length).to.equal(5);     
    });
  }); 
    
    describe("CheckLongLink test", function() {
        it("Premium and Systemurl", function() {
            var req = httpMocks.createRequest({body:{shortlink:'stats', longlink:'testt.de'}});
            var res = httpMocks.createResponse();
            GLOBAL_PREMIUM='true';
            console.log(req);
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
    
});