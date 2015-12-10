var assert = require('assert');
var expect = require('expect.js');

var Fetcher = require('../build/fetcher.js').Fetcher;

describe('Fetcher', function () {
	
	it('exists', function () {
		expect(new Fetcher()).not.to.be(null);
	});

	describe('fetch', function () {

		var fetcher = new Fetcher('');

		it('returns a url', function () {
			
		});

	});

});