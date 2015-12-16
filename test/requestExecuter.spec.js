var chai = require('chai');
var chaiAsPromised = require("chai-as-promised"); 
var expect = chai.use(chaiAsPromised).expect;

var nock = require('nock');
var axios = require('axios');
var querystring = require('querystring');
var fs = require('fs');

var RequestExecuter = require('../build/requestExecuter.js').RequestExecuter;

var wikipedia = nock('https://en.wikipedia.org').log(console.log);
nock.disableNetConnect();      

describe('RequestExecuter', function () {

  it('exists', function () {
    expect(new RequestExecuter()).to.be.a('object');
  });

  describe('list request', function () {

    var requestObject = {
      url: 'https://en.wikipedia.org/w/api.php',
      params: {
        action: 'parse',
        prop: 'text',
        format: 'json',
        section: 2,
        page: 'October_3'         
      },
      transformResponse: [function (data) {
        data = JSON.parse(data);
        return {
          title: data.parse.title,
          pageId: data.parse.pageid,
          text: data.parse.text['*']
        };
      }]
    };

    var expectedResponse = JSON.parse(fs.readFileSync('test/data/day-response.json', 'utf8'));
    var executer = new RequestExecuter(requestObject);

    describe('buildRequest', function () {
      it('creates the request promise', function () {
        expect(executer.buildRequest().then).to.be.a('function');
      });
    });

    describe('sendRequest', function () {

      var wiki = nock('https://en.wikipedia.org')
                  .persist()
                  .get('/w/api.php?'+querystring.stringify(requestObject.params))
                  .reply(200, expectedResponse);

      it('returns a status of 200', function () {
        var response = executer.sendRequest()
          .then(function (response) {
            return response.status;
          });

        return expect(response).to.eventually.equal(200);
      });

      it('returns the proper format', function () {

        var expected = [
          'title',
          'pageId',
          'text'
        ];

        var response =  executer.sendRequest()
          .then(function (response) {
            return response.data;
          });
        
        return expect(response).to.eventually.have.all.keys(expected);
      });

      it('returns the correct title', function () {

        var response = executer.sendRequest()
          .then(function (response) {
            return response.data.title;
          });

        return expect(response).to.eventually.eql(expectedResponse.parse.title);
      });

    });

  });

});