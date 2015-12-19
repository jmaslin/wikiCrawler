var expect = require('chai').expect;
var fs = require('fs');

var PersonRequestBuilder = require('../build/personRequestBuilder.js').PersonRequestBuilder;

describe('PersonRequestBuilder', function () {

  var person = {
    "name": "Catherine of Aragon (d. 1536)",
    "uri": "/wiki/Catherine_of_Aragon",
    "year": "1485"
  };

  var builder = new PersonRequestBuilder(person);

  it('exists', function () {
    expect(new PersonRequestBuilder()).to.be.a('object');
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
        titles: 'Catherine_of_Aragon'
      };
      expect(builder.buildParameters()).to.eql(expectedParams);
    });
  });

  describe('transformUri', function () {
    it('changes the uri component format', function () {
      var expected = 'Catherine_of_Aragon';
      expect(builder.transformUri(person.uri)).to.eql(expected);
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
    it('changes the response data format', function () {
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