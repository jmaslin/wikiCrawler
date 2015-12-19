var expect = require('chai').expect;

var RequestExecuter = require('../build/requestExecuter.js').RequestExecuter;

describe('RequestExecuter', function () {

  var requestConfig = {
    url: 'http://www.wikipedia.org'
  };

  var requester = new RequestExecuter(requestConfig);

  it('exists', function () {
    expect(new RequestExecuter()).to.be.a('object');
  });

  describe('buildRequest', function () {
    it('builds a request', function () {
      expect(requester.buildRequest().defaultConfig.baseUrl).to.eql(requestConfig.url);
    });
  });

  describe('sendRequest', function () {
    it('returns a promise', function () {
      expect(requester.sendRequest()).to.be.a('Promise');
    });
  });


});