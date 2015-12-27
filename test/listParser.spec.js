var expect = require('chai').expect;
var fs = require('fs');
var cheerio = require('cheerio');

var ListParser = require('../build/listParser.js').ListParser;

var textToParse = JSON.parse(fs.readFileSync('test/data/day-response.json', 'utf8')).parse.text['*'];

describe('ListParser', function () {
  
  var listParser = new ListParser(textToParse);

  it('exists', function () {
    expect(new ListParser()).to.be.a('object');
  });

  describe('parseListItem', function () {
    var $ = cheerio.load('<li><a href="/wiki/2003" title="2003">2003</a> – <a href="/wiki/Catharina-Amalia,_Princess_of_Orange" title="Catharina-Amalia, Princess of Orange">Catharina-Amalia, Princess of Orange</a></li>');
    var expected = {
      name: 'Catharina-Amalia, Princess of Orange',
      uri: '/wiki/Catharina-Amalia,_Princess_of_Orange',
      year: '2003'
    };

    var listItem = listParser.parseListItem(0, $.html());
    
    it('should return a list item object', function () {
      expect(listItem).to.be.ok;
      expect(listItem).to.deep.eql(expected);
    });

  });

  describe('parseList', function () {

    it('should return an array', function () {
      expect(listParser.parseList()).to.be.a('array');
    }); 

    it('should be the correct length', function () {
      var expected = 211;
      expect(listParser.parseList().length).to.equal(expected);
    });

  });

  describe('getListItemName', function () {
    xit('should return the name from text', function () {
      var expected = 'Catharina-Amalia, Princess of Orange';
      var $ = cheerio.load('<li><a href="/wiki/2003" title="2003">2003</a> – <a href="/wiki/Catharina-Amalia,_Princess_of_Orange" title="Catharina-Amalia, Princess of Orange">Catharina-Amalia, Princess of Orange</a></li>');
      var text = $('li').text();

      expect(listParser.getListItemName(text)).to.equal(expected);
    });
  });

  describe('getListItemYear', function () {
    it('should return the name from text', function () {
      var expected = '2003';
      var $ = cheerio.load('<li><a href="/wiki/2003" title="2003">2003</a> – <a href="/wiki/Catharina-Amalia,_Princess_of_Orange" title="Catharina-Amalia, Princess of Orange">Catharina-Amalia, Princess of Orange</a></li>');
      var text = $('li').text();

      expect(listParser.getListItemYear(text)).to.equal(expected);

    });
  });

});