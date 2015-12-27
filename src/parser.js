var ListParser = require('./listParser.js').ListParser;

class Parser {

  constructor(textToParse) {
    this._textToParse = textToParse;
  }

  parseList() {    
    var listParser = new ListParser(this._textToParse); 
    return listParser.itemList;
  }

}

exports.Parser = Parser;