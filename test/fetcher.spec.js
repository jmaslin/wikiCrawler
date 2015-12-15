var chai = require('chai');
var chaiAsPromised = require("chai-as-promised"); 
var expect = chai.use(chaiAsPromised).expect;

var moment = require('moment');

var Fetcher = require('../build/fetcher.js').Fetcher;

describe('Fetcher', function () {
  
  var date = moment().month('October').date(3);
  var fetcher = new Fetcher(date);

  it('exists', function () {
    expect(new Fetcher()).to.be.a('object');
  });

  describe('fetch', function () {

    it('returns data', function () {

      var expected = [
        'title',
        'pageId',
        'text'
      ];

      var response = fetcher.fetch()
        .then(function (response) {
          return response.data;
        });

      return expect(response).to.eventually.have.all.keys(expected);

    });

  });

});