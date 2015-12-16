var expect = require('chai').expect;
var fs = require('fs');
var cheerio = require('cheerio');

var Parser = require('../build/parser.js').Parser;

var listToParse = JSON.parse(fs.readFileSync('test/data/day-response.json', 'utf8')).parse.text['*'];

describe('Parser', function () {
  
  var parser = new Parser(listToParse);

  it('exists', function () {
    expect(new Parser()).to.be.a('object');

  });

  describe('parseList', function () {

    it('should return an array', function () {
      expect(parser.parseList()).to.be.a('array');
    }); 

    it('should be the correct length', function () {
      var expected = 211;
      expect(parser.parseList().length).to.equal(expected);
    });

  });

});