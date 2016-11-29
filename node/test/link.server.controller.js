var expect = require("chai").expect;
var link = require("../app/controllers/link.server.controller.js");
var httpMocks = require('node-mocks-http');

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