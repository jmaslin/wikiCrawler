var ListRequestBuilder = require('./listRequestBuilder').ListRequestBuilder;
var PersonRequestBuilder = require('./personRequestBuilder').PersonRequestBuilder;

var RequestExecuter = require('./requestExecuter').RequestExecuter;

class Fetcher {

  constructor() {
  }

  getList(date, listType) {
    var requester = new ListRequestBuilder(date, listType);
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