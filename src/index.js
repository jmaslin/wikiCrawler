var readline  = require('readline');
var moment    = require('moment');
var fs        = require('fs');

var Fetcher   = require('./fetcher').Fetcher;
var Parser    = require('./parser').Parser;

var fetcher, parser, date, parsedData;

console.log("Wiki Parser");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter a date. (e.g. Dec 31) ", function (input) {
  var dateParts = input.split(' ');
  date = moment().month(dateParts[0]).date(dateParts[1]);
  console.log("Looking up famous births for ", moment(date).format('MMMM D'));

  fetcher = new Fetcher(date);
  fetchData();

});

var tmpFile = 'tmp/data.json';

fs.unlinkSync(tmpFile);
var file = fs.createWriteStream(tmpFile);

var fetchData = function fetchData () {

  fetcher.fetch().then(function (response) {

    console.log("Response received");
    parser = new Parser(response.data.text);
    // parser.parseList();

    parser.itemList.forEach(function (item) {
      file.write(JSON.stringify(item, null, 2));
      file.write('\n');
    });

    file.end();

    rl.close();
  });

};