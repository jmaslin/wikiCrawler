var readline = require('readline');
var Promise = require('promise');

var moment = require('moment');
require('moment-range');

var Fetcher = require('./fetcher').Fetcher;
var Parser = require('./parser').Parser;
var Saver = require('./saver').Saver;

var fetcher, parser, saver;

var fetchData = function fetchData (dateFormatted) {
  return new Promise(function (resolve, reject) {

    fetcher.getList('births').then(function (response) {
      var sublist;
      parser = new Parser(response.data.text);
      sublist = parser.parseList().slice(0, 5);

      sublist.forEach(function (person) {
        fetcher.getPerson(person).then(function (personResponse) {
          person.aboutText = personResponse.data.text;
          person.pageId = personResponse.data.pageId;
          
          saver.addPersonForDay(person, dateFormatted);
        });
      });
      resolve();
    });

  });
};

var start = moment('2016-01-01', 'YYYY-MM-DD');
var end = moment('2016-01-05', 'YYYY-MM-DD');
var range = moment.range(start, end);

saver = new Saver('tmp/all.json');
fetcher = new Fetcher();

var dayPromises = [];

range.by('days', function (dayMoment) {
  var dateFormatted = moment(dayMoment).format('MMMM_D');
  fetcher.date = dayMoment;

  dayPromises.push(fetchData(dateFormatted));
});

console.log("Wiki Parser");
Promise.all(dayPromises);