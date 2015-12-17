var ListRequestBuilder = require('./listRequestBuilder').ListRequestBuilder;
var PersonRequestBuilder = require('./personRequestBuilder').PersonRequestBuilder;

var RequestExecuter = require('./requestExecuter').RequestExecuter;

class Fetcher {

  constructor(date) {
    this._date = date;
  }

  get date() {
    return this._date;
  }

  set date(date) {
    this._date = date;
  }

  getList(listType) {
    var requester = new ListRequestBuilder(this._date, listType);
    var executer = new RequestExecuter(requester.buildRequest());
    return executer.sendRequest();
  }

  getPerson(person) {
    var requester = new PersonRequestBuilder(person);
    var executer = new RequestExecuter(requester.buildRequest());
    return executer.sendRequest();
  }

}

exports.Fetcher = Fetcher;