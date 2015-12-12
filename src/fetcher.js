var RequestBuilder = require('./requestBuilder').RequestBuilder;
var RequestExecuter = require('./requestExecuter').RequestExecuter;

class Fetcher {

	constructor(date) {
		this.date = date;
	}

	fetch() {
		console.log("Fetching...");
		var requester = new RequestBuilder(this.date);
		var executer = new RequestExecuter(requester.buildRequest());
		return executer.sendRequest();
	}

}

exports.Fetcher = Fetcher;