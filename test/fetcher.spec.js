var expect = require('expect.js');
var moment = require('moment');

var Fetcher = require('../build/fetcher.js').Fetcher;

describe('Fetcher', function () {
  
  var date = moment().month('October').date(3);
  var fetcher = new Fetcher(date);

  it('exists', function () {
    expect(new Fetcher()).not.to.be(null);
  });

  describe('fetch', function () {

    it('returns data', function (done) {

      var expected = [
        'title',
        'pageId',
        'text'
      ];

      fetcher.fetch()
        .then(function (response) {
          expect(response.data).to.only.have.keys(expected);
          
          done();
        });

    });

  });

});