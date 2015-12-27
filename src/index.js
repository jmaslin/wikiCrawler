// var Promise = require('promise');
var Q = require('q');
var async = require('async-q');
var moment = require('moment');
require('moment-range');

var Fetcher = require('./fetcher').Fetcher;
var Parser = require('./parser').Parser;
var Saver = require('./saver').Saver;

var fetcher, parser, saver;
var listType = "births";
var index = 0;

// http://www.frontcoded.com/splitting-javascript-array-into-chunks.html
var createGroupedArray = function(arr, chunkSize) {
  var groups = [], i;
  for (i = 0; i < arr.length; i += chunkSize) {
      groups.push(arr.slice(i, i + chunkSize));
  }
  return groups;
}

var buildPerson = function buildPerson(person, response) {
  person.aboutText = response.extract;
  person.pageId = response.pageid;

  return person;
};

var getListForDay = function getListForDay (day) {
  var deferred = Q.defer();

  var peopleGroups;
  fetcher.getList(day, 'births').then(function (response) {
    var peopleListParsed = new Parser(response.data.text).parseList();
    deferred.resolve(peopleListParsed);
  }, function (err) {
    console.log("Error: ", err);
  });

  return deferred.promise;
};

var printDate = function printDate (dayMoment) {
  var dateFormatted = moment(dayMoment).format('MMMM_D');
  console.log(dateFormatted);
};

var buildListForDay = function buildListForDay (dayMoment) {

  var dayDeferred = Q.defer();
  var monthDay = dayMoment.format('MM/DD');
  var people = [];

  // Get list for day + parse it`
  var dayList = getListForDay(dayMoment);

  dayList.then(function (peopleList) {

    // Break list into chunks 
    var peopleGroups = createGroupedArray(peopleList, 20);

    // console.log("Groups: " + peopleGroups.length);

    async.each(peopleGroups, function iterator(group, groupIndex, arr) {
      var deferred = Q.defer();

      var personList = fetcher.getPersonList(group);
      personList.then(function (response) {
        var responseData, groupKeys;

        responseData = response.data.query.pages;
        groupKeys = Object.keys(responseData);

        if (groupKeys.length !== group.length) {
          console.log("Not all data returned for query. Group " + groupIndex);
        }

        group.forEach(function (person, index) {
          var personData = responseData[ groupKeys[index] ];

          if (personData) {
            person = buildPerson(person, personData);
          } else {
            console.log("No data for person: " + person.name);
            person.error = "No data found.";
          }
          
          person.monthDay = monthDay;
          people.push(person);
        });

        // console.log("After group: " + groupIndex);

        deferred.resolve();
      }, function (err) {
        console.log("Error: ", err);
      });

      return deferred.promise;
    })
    .then(function (results) {

      console.timeEnd("Time to complete");
      console.log("Count: " + people.length);

      dayDeferred.resolve(people);
    }, function (err) {
      console.log("Error ", err);
      dayDeferred.resolve();
    })
    .done();

    return deferred.promise;

  });

  return dayDeferred.promise;
};

var start = moment('2016-01-01', 'YYYY-MM-DD');
var end = moment('2016-12-31', 'YYYY-MM-DD');
var range = moment.range(start, end);

saver = new Saver('tmp/all-1.json');
fetcher = new Fetcher();

var dayPromises = [];
var delay = 0, delayAmount = 1000;

var days = [];

range.by('days', function (dayMoment) {
  days.push(dayMoment);
});

console.time("Total Time");

async.eachLimit(days, 2, function iterator(day, index, arr) {
  printDate(day);
  console.time("Time to complete");
  return buildListForDay(day);
}).then(function (results) {
  console.timeEnd("Total Time");
  var people = [];
  results.forEach(function (day, index) {
    day.forEach(function (person) {
      people.push(person);
    });
    // saver.manualSetData(index, day);
  });
  saver.manualSetData('people', people);
}, function (err) {
  console.log("Error: ", err);
}).done()