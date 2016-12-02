var expect = require("chai").expect;
var httpMocks = require('node-mocks-http');
var admin = require("../app/controllers/admin.server.controller.js");

describe("Admin Controller", function () {
    describe("Check Title", function () {
        it("checks the title of the page", function () {
            var req = httpMocks.createRequest();
            var res = httpMocks.createResponse();
            admin.render(req, res);
            expect(res._getRenderData().title).to.equal('Admin');
        });
    });
    describe("Check Login", function () {
        it("checks successful login attempt", function () {
            var req = httpMocks.createRequest({
                body: {
                    error: '',
                    password: 'qwer'
                }
            });
            var res = httpMocks.createResponse();
            admin.validate(req, res);
            var data = JSON.parse(res._getData());
            expect(data.success).to.equal(true);
        });
        it("checks the error message of an invalid login attempt", function () {
            var req = httpMocks.createRequest({
                body: {
                    error: '',
                    password: 'falsch'
                }
            });
            var res = httpMocks.createResponse();
            admin.validate(req, res);
            var data = JSON.parse(res._getData());
            expect(data.err).to.equal('Invalid Password');
        });
        it("checks the json result of an invalid login attempt", function () {
            var req = httpMocks.createRequest({
                body: {
                    error: '',
                    password: 'falsch'
                }
            });
            var res = httpMocks.createResponse();
            admin.validate(req, res);
            var data = JSON.parse(res._getData());
            expect(data.success).to.equal(false);
        });
    });
});