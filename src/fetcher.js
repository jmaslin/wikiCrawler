var ListRequestBuilder = require('./listRequestBuilder').ListRequestBuilder;
var PersonRequestBuilder = require('./personRequestBuilder').PersonRequestBuilder;
var PersonListRequestBuilder = require('./personListRequestBuilder').PersonListRequestBuilder;

var RequestExecuter = require('./requestExecuter').RequestExecuter;

class Fetcher {

  constructor() {}

  getList(date, listType) {
    var requester, executer;
    requester = new ListRequestBuilder(date, listType);
    executer = new RequestExecuter(requester.buildRequest());
    return executer.sendRequest();
  }

  getPerson(person) {
    var requester, executer;
    requester = new PersonRequestBuilder(person);
    executer = new RequestExecuter(requester.buildRequest());
    return executer.sendRequest();
  }

  getPersonList(personList) {
    var requester, executer;
    requester = new PersonListRequestBuilder(personList);
    executer = new RequestExecuter(requester.buildRequest());
    return executer.sendRequest();
  }

}

exports.Fetcher = Fetcher;