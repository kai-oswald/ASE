var expect = require("chai").expect;
var mongoose = require('mongoose');
require('../app/models/link.server.model');
var Link = mongoose.model("Link");
var link = require("../app/controllers/link.server.controller.js");

describe("Link Controller", function () {
  describe("Random Text Generator", function () {
    it("creates a 5 character random string", function () {
      var rnd = link.randomText();
      var rnd2 = link.randomText();
      expect(rnd.length).to.equal(5);
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
    });    
  }); 
});