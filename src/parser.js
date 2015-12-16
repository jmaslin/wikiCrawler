var cheerio = require('cheerio');
var ListParser = require('./listParser.js').ListParser;

class Parser {

  constructor(textToParse) {
    this.textToParse = textToParse;
  }

  parseList() {    
    var listParser = new ListParser(this.textToParse); 
    return listParser.itemList;
  }

}

exports.Parser = Parser;