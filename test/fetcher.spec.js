var assert = require('assert');
var expect = require('expect.js');

var Fetcher = require('../build/fetcher.js').Fetcher;

describe('Fetcher Class', function () {
	
	it('sanity check', function () {
		expect(new Fetcher()).not.to.be(null);
	});

})