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
var createGroupedArray = function (arr, chunkSize) {
  var groups = [], i;
  for (i = 0; i < arr.length; i += chunkSize) {
    groups.push(arr.slice(i, i + chunkSize));
  }
  return groups;
}

var buildPerson = function buildPerson(person, personData) {

  if (personData) {
    person.aboutText = personData.extract;
    person.pageId = personData.pageid;
  } else {
    console.log("No data for person: " + person.name);
    person.error = "No data found.";
  }

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

var personListRequestSuccess = function personListRequestSuccess (group, response, monthDay) {

  var deferred = Q.defer();

  var responseData, groupKeys, people = [];

  responseData = response.data.query.pages;
  groupKeys = Object.keys(responseData);

  if (groupKeys.length !== group.length) {
    console.log("Not all data returned for query.");
  }

  group.map(function (person, index) {
    var personData = responseData[ groupKeys[index] ];
    person = buildPerson(person, personData);
    person.monthDay = monthDay;

    return person;
  });

  deferred.resolve(group);

  return deferred.promise;
};

var responseError = function responseError (err) {
  console.log("Error ", err);
};

var buildListForDay = function buildListForDay (dayMoment) {

  var dayDeferred = Q.defer();
  var monthDay = dayMoment.format('MM/DD');

  // Get list for day + parse it`
  var dayList = getListForDay(dayMoment);

  dayList.then(function (peopleList) {

    // Break list into chunks 
    var peopleGroups = createGroupedArray(peopleList, 20);

    async.each(peopleGroups, function iterator(group, groupIndex, arr) {
      var deferred = Q.defer();
      var personList = fetcher.getPersonList(group);

      personList.then(function (response) {
        personListRequestSuccess(group, response, monthDay).then(function (group) {
          deferred.resolve(group);
        });
      }, responseError);

      return deferred.promise;
    })
    .then(function (results) {
      var people = [];

      results.forEach(function (group) {
        group.forEach(function (person) {
          people.push(person);
        });
      });

      console.timeEnd("Time to complete");
      console.log("Count: " + people.length);

      dayDeferred.resolve(people);
    }, function (err) {
      responseError(err);
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

fetcher = new Fetcher();

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
  results.forEach(function (day, index) {
    var saver = new Saver('tmp/days/'+index+'.json'),
        people = [];
    day.forEach(function (person) {
      people.push(person);
    });
    saver.manualSetData('people', people);
  });
}, function (err) {
  console.log("Error: ", err);
}).done()