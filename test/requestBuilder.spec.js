var expect = require('expect.js');
var moment = require('moment');

var RequestBuilder = require('../build/requestBuilder.js').RequestBuilder;

describe('RequestBuilder', function () {

  var date = moment().month('October').date(3);
  var builder = new RequestBuilder(date);

  it('exists', function () {
    expect(new RequestBuilder()).to.not.be(null);
  });

  describe('buildParameters', function () {

    it('generates parameters', function () {
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

  describe('formatDate', function () {

    it('formats the date', function () {
      var expected = 'October_3';
      expect(builder.formatDate()).to.eql(expected);
    });
  
  });

  describe('buildRequest', function () {

    it('creates the request object', function () {
      var expected = {
        url: 'https://en.wikipedia.org/w/api.php',
        params: {
          action: 'parse',
          prop: 'text',
          section: 2,
          format: 'json',
          page: 'October_3'         
        }
      };
      expect(builder.buildRequest()).to.eql(expected);
    });

  });



});