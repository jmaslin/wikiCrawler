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

  describe('getList', function () {

    it('returns data', function () {

      var expectedKeys = [
        'title',
        'pageId',
        'text'
      ];

      var listType = 'births';

      var response = fetcher.getList(date, listType)
        .then(function (response) {
          return response.data;
        });

      return expect(response).to.eventually.have.all.keys(expectedKeys);
    });

  });

  describe('getPerson', function () {
    var person = {
      "name": "Catherine of Aragon (d. 1536)",
      "uri": "/wiki/Catherine_of_Aragon",
      "year": "1485"
    };

    it('returns data', function () {
      var expectedKeys = [
        'name',
        'pageId',
        'text'
      ];

      var response = fetcher.getPerson(person)
        .then(function (response) {
          return response.data;
        });

      return expect(response).to.eventually.have.all.keys(expectedKeys);
    });

  });

});