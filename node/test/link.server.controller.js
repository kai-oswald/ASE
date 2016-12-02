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
    describe("Create extended Link Model", function () {
        it("creates an extended link model from shorter model", function () {
            var mock = {
                shortlink: "abcde",
                longlink: "https://google.de"
            };
            GLOBAL_SERVER = "localhost:3000";
            var model = link.createLinkModel(mock);
            expect(model.shortLink).to.equal("/abcde");
            expect(model.shortURL).to.equal("localhost:3000/abcde");
            expect(model.shortQR).to.equal("localhost:3000/qr/abcde");
            expect(model.longURL).to.equal("https://google.de");
            expect(model.longLink).to.equal("google.de");
        });
    });

    describe("Check Long Link", function () {
        it("checks Long Link with Premium and Systemurl", function () {
            var req = httpMocks.createRequest({
                body: {
                    shortlink: 'stats',
                    longlink: 'testt.de'
                }
            });
            var res = httpMocks.createResponse();
            GLOBAL_PREMIUM = "true";
            var re = link.checkLongLink(req, res, function () {
                expect(res.error).to.equal(200); //gesetzt?
            });
        });
    });
    describe("Check Long Link", function () {
        it("checks Long Link with Premium and no Systemurl", function () {
            var req = httpMocks.createRequest({
                body: {
                    shortlink: 'abcd',
                    longlink: 'testt.de'
                }
            });
            var res = httpMocks.createResponse();
            GLOBAL_PREMIUM = "true";
            var re = link.checkLongLink(req, res, function () {
                expect(res.statusCode).to.equal(200);
            });

        });
    });
    describe("Check Long Link", function () {
        it("checks Long Link without Premium", function () {
            var req = httpMocks.createRequest({
                body: {
                    shortlink: 'qweqe',
                    longlink: 'testt.de'
                }
            });
            var res = httpMocks.createResponse();
            GLOBAL_PREMIUM = 'false';
            var re = link.checkLongLink(req, res, function () {
                expect(res.statusCode).to.equal(200);
            });

        });
    });

    describe("Check Short Link", function () {
        it("checks if shortlink already exists", function () {
            GLOBAL_SERVER = 'localhost:8001';
            GLOBAL_PREMIUM = "true";
            var req = httpMocks.createRequest({
                body: {
                    shortlink: 'abc',
                    longlink: 'www.abc.de'
                }
            });
            var res = httpMocks.createResponse();
            link.create(req, res);
            link.checkShortLink(req, res);
            expect(res.statusCode).to.equal(200);
        });
    });

    describe("Check Short Link", function () {
        it("checks if shortlink is a new one", function () {
            GLOBAL_SERVER = 'localhost:8001';
            GLOBAL_PREMIUM = "true";
            var req = httpMocks.createRequest({
                body: {
                    shortlink: 'abc',
                    longlink: 'www.abc.de'
                }
            });
            var res = httpMocks.createResponse();
            link.checkShortLink(req, res);
            expect(res.statusCode).to.equal(200);
        });
    });
    describe("URL Validation", function () {
        it("checks valid Url 1/2", function () {
            var test = link.validateUrl('https://www.google.de');
            expect(test).to.equal(true);
        });
        it("checks valid Url 2/2", function () {
            var test = link.validateUrl('http://www.google.de');
            expect(test).to.equal(true);
        });
        it("checks valid Url 3/4", function () {
            var test = link.validateUrl('https://google.de');
            expect(test).to.equal(true);
        });
        it("checks valid Url 4/4", function () {
            var test = link.validateUrl('http://google.de');
            expect(test).to.equal(true);
        });
        it("checks invalid Url 1/4", function () {
            var test = link.validateUrl('google.de');
            expect(test).to.equal(false);
        });
        it("checks invalid Url 2/4", function () {
            var test = link.validateUrl('www.google.de');
            expect(test).to.equal(false);
        });
        it("checks invalid Url 3/4", function () {
            var test = link.validateUrl('http://google');
            expect(test).to.equal(false);
        });
        it("checks invalid Url 4/4", function () {
            var test = link.validateUrl('ftp://google.de');
            expect(test).to.equal(false);
        });
    });
    describe("Application URL Check", function () {
        it("checks if Short Link is an Application URL", function () {
            var req = httpMocks.createRequest({
                body: {
                    shortlink: 'stats',
                    longlink: 'www.abc.de',
                    error: ''
                }
            });
            GLOBAL_PREMIUM ="true";
            var res = httpMocks.createResponse();
            link.checkLongLink(req, res, function () {});
            var data = JSON.parse(res._getData());
            expect(data.error).to.equal('Shortlink stats is an application url');
        });
    });
    describe("Find Shortlink", function () {
        it("creates Short Link and checks if it was saved", function () {
            GLOBAL_SERVER = 'localhost:8001';
            var req = httpMocks.createRequest({
                body: {
                    shortlink: 'abcde',
                    longlink: 'www.abcde.de'
                }
            });
            var res = httpMocks.createResponse();
            link.create(req, res);
            link.linkByShort(req, res, function () {}, 'abcde');
            expect(res.statusCode).to.equal(200);
        });
    });
});