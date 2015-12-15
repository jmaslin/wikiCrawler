var expect = require('expect.js');
var nock = require('nock');
var axios = require('axios');
var querystring = require('querystring');
var fs = require('fs');

var RequestExecuter = require('../build/requestExecuter.js').RequestExecuter;

describe('RequestExecuter', function () {

  var wikipedia = nock('https://en.wikipedia.org').log(console.log);

  nock.disableNetConnect();

  var requestObject = {
    url: 'https://en.wikipedia.org/w/api.php',
    params: {
      action: 'parse',
      prop: 'text',
      section: 2,
      format: 'json',
      page: 'October_3'         
    }
  };

  var expectedResponse = JSON.parse(fs.readFileSync('test/data/day-response.json', 'utf8'));

  var executer = new RequestExecuter(requestObject);
  
  it('exists', function () {
    expect(new RequestExecuter()).to.not.be(null);
  });

  describe('buildRequest', function () {
    it('creates the request promise', function () {
      var expected = 'Promise';
      expect(executer.buildRequest().constructor.name).to.be(expected);
    });
  });

  describe('sendRequest', function () {

    var wiki = nock('https://en.wikipedia.org')
                .persist()
                .get('/w/api.php?'+querystring.stringify(requestObject.params))
                .reply(200, expectedResponse);

    it('returns a status of 200', function (done) {
      executer.sendRequest()
        .then(function (response) {
          expect(response).to.not.be(null);
          expect(response.status).to.be(200);

          done();
        });
    });

    it('returns the proper format', function (done) {

      var expected = [
        'title',
        'pageId',
        'text'
      ];

      executer.sendRequest()
        .then(function (response) {
          expect(response.data).to.only.have.keys(expected);
          done();
        });

    });

    it('returns the proper data', function (done) {

      executer.sendRequest()
        .then(function (response) {
          expect(response.data.title).to.be(expectedResponse.parse.title);
          expect(response.data.pageId).to.be(expectedResponse.parse.pageid);
          expect(response.data.text).to.be(expectedResponse.parse.text['*']);

          done();
        });
    })

  });

});