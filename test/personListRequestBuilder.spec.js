var expect = require('chai').expect;
var fs = require('fs');

var PersonListRequestBuilder = require('../build/personListRequestBuilder.js').PersonListRequestBuilder;

describe('PersonListRequestBuilder', function () {

  var people = [{
    "name": "Catherine of Aragon (d. 1536)",
    "uri": "/wiki/Catherine_of_Aragon",
    "year": "1485"
  }, {

    "name": "Harold Ford, Jr",
    "uri": "/wiki/Harold_Ford,_Jr.",
    "year": "1970"
  }];

  var builder = new PersonListRequestBuilder(people);

  it('exists', function () {
    expect(new PersonListRequestBuilder()).to.be.a('object');
  });

  describe('buildParameters', function () {
    it('generates parameters object', function () {
      var expectedParams = {
        action: 'query',
        prop: 'extracts',
        exsentences: '3',
        explaintext: '',
        format: 'json',
        redirects: '',
        exintro: '',
        exlimit: 'max',
        titles: 'Catherine_of_Aragon|Harold_Ford,_Jr.'
      };
      expect(builder.buildParameters()).to.eql(expectedParams);
    });
  });

  describe('transformUri', function () {
    it('changes the uri component format', function () {
      var expected = 'Catherine_of_Aragon';
      expect(builder.transformUri(people[0].uri)).to.eql(expected);
    });
  });

  describe('buildRequest', function () {
    it('has the correct parameters', function () {
      expect(builder.buildRequest().params).to.eql(builder.buildParameters());
    });

    it('has the correct endpoint', function () {
      var expected = 'https://en.wikipedia.org/w/api.php';
      expect(builder.buildRequest().url).to.eql(expected);
    });

    it('has the transformResponse function', function () {
      expect(builder.buildRequest().transformResponse).to.be.a('function');
    });
  });
  
  describe('transformResponse function', function () {
    xit('changes the response data format', function () {
      var expectedKeys = [
        'name',
        'pageId',
        'text'
      ];
      
      var responseFormat = JSON.stringify(JSON.parse(fs.readFileSync('test/data/person-response.json', 'utf8')));
      expect(builder.transformResponse(responseFormat)).to.have.all.keys(expectedKeys);
    });

  });


});