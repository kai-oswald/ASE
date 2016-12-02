var expect = require("chai").expect;
var httpMocks = require('node-mocks-http');
var index = require("../app/controllers/index.server.controller.js");

describe("Index Controller", function () {
    describe("Check title", function () {
        it("check the title of the page", function () {
            var req = httpMocks.createRequest();
            var res = httpMocks.createResponse();
            index.render(req, res);
            expect(res._getRenderData().title).to.equal('Home');
        });
    });
});