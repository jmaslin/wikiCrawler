var assert = require('assert');
var expect = require('expect.js');

var RequestBuilder = require('../build/requestBuilder.js').RequestBuilder;

describe('RequestBuilder', function () {
	
	it('exists', function () {
		expect(new RequestBuilder()).to.not.be(null);
	});

})