var expect    = require("chai").expect;
var link = require("../app/controllers/link.server.controller.js");

describe("Link Controller", function() {
  describe("Random Text Generator", function() {
    it("creates random string", function() {
      var rnd = link.randomText();
      expect(rnd.length).to.equal(5);     
    });
  }); 
});