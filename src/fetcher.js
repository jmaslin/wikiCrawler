var ListRequestBuilder = require('./listRequestBuilder').ListRequestBuilder;
var RequestExecuter = require('./requestExecuter').RequestExecuter;

class Fetcher {

  constructor(date) {
    this._date = date;
  }

  getList(listType) {
    var requester = new ListRequestBuilder(this._date, listType);
    var executer = new RequestExecuter(requester.buildRequest());
    return executer.sendRequest();
  }

}

exports.Fetcher = Fetcher;