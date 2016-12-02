var expect = require("chai").expect;
var httpMocks = require('node-mocks-http');
var index = require("../app/controllers/index.server.controller.js");

describe("Index Controller", function () {
    describe("Check title", function () {
        it("checks the title of the index page", function () {
            var req = httpMocks.createRequest({
                body: {
                    shortlink: 'abc',
                    longlink: 'www.abc.de'
                }
            });
            var res = httpMocks.createResponse();
            index.render(req, res);
            expect(res._getRenderData().title).to.equal('Home');
        });
    });
});