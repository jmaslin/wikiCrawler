var expect = require('chai').expect;
var moment = require('moment');

var ListRequestBuilder = require('../build/listRequestBuilder.js').ListRequestBuilder;

describe('ListRequestBuilder', function () {

  var date = moment().month('October').date(3);
  var listType = 'births';

  var builder = new ListRequestBuilder(date, listType);

  it('exists', function () {
    expect(new ListRequestBuilder()).to.be.a('object');
  });

  describe('listSectionNumber', function () {
    it('returns the list number from name', function () {
      var expected = 2;
      expect(builder.listSectionNumber()).to.equal(expected);
    });
  });

  describe('buildParameters', function () {

    it('generates parameters object', function () {
      var expected = {
        action: 'parse',
        prop: 'text',
        section: 2,
        format: 'json',
        page: 'October_3'
      };

      expect(builder.buildParameters()).to.eql(expected);
    });

  });

  describe('buildRequest', function () {

    it('has the correct parameters', function () {
      var expected = {
        action: 'parse',
        prop: 'text',
        section: 2,
        format: 'json',
        page: 'October_3'         
      };
      expect(builder.buildRequest().params).to.eql(expected);
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
      var expectedFormat = {
        title: '',
        pageId: '',
        text: ''
      };

      var responseFormat = JSON.stringify({ parse: { title: '', pageid: '', text: { '*': '' } } });

      expect(builder.transformResponse(responseFormat)).to.eql(expectedFormat);
    });

  });


});