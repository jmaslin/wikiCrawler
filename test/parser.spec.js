var expect = require('chai').expect;
var fs = require('fs');
var cheerio = require('cheerio');

var Parser = require('../build/parser.js').Parser;

var textToParse = JSON.parse(fs.readFileSync('test/data/day-response.json', 'utf8')).parse.text['*'];

describe('Parser', function () {
  
  var parser = new Parser(textToParse);

  it('exists', function () {
    expect(new Parser()).to.be.a('object');

  });

  describe('parseListItem', function () {
    var $ = cheerio.load('<li><a href="/wiki/2003" title="2003">2003</a> – <a href="/wiki/Catharina-Amalia,_Princess_of_Orange" title="Catharina-Amalia, Princess of Orange">Catharina-Amalia, Princess of Orange</a></li>');
    var expected = {
      name: 'Catharina-Amalia',
      uri: '/wiki/Catharina-Amalia,_Princess_of_Orange',
      year: '2003'
    };

    var listItem = parser.parseListItem(0, $.html());
    
    it('should return a list item object', function () {
      expect(listItem).to.be.ok;
      expect(listItem).to.deep.eql(expected);
    });

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

  describe('getListItemName', function () {
    it('should return the name from text', function () {
      var expected = 'Catharina-Amalia';
      var $ = cheerio.load('<li><a href="/wiki/2003" title="2003">2003</a> – <a href="/wiki/Catharina-Amalia,_Princess_of_Orange" title="Catharina-Amalia, Princess of Orange">Catharina-Amalia, Princess of Orange</a></li>');
      var text = $('li').text();

      expect(parser.getListItemName(text)).to.equal(expected);
    });
  });

  describe('getListItemYear', function () {
    it('should return the name from text', function () {
      var expected = '2003';
      var $ = cheerio.load('<li><a href="/wiki/2003" title="2003">2003</a> – <a href="/wiki/Catharina-Amalia,_Princess_of_Orange" title="Catharina-Amalia, Princess of Orange">Catharina-Amalia, Princess of Orange</a></li>');
      var text = $('li').text();

      expect(parser.getListItemYear(text)).to.equal(expected);

    });
  });

});