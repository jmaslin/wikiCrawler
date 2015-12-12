var moment = require('moment');

class RequestBuilder {

	constructor(date) {
		this.date = date;
	}

	buildParameters() {

		var output = {
			action: 'parse',
			prop: 'text',
			section: 2,
			format: 'json'
		};

		output.page = this.formatDate();

		return output;
	}

	formatDate() {
		return moment(this.date).format('MMMM_D');
	}

	buildRequest() {
		var endpoint = 'https://en.wikipedia.org/w/api.php';
		return {
			url: endpoint,
			params: this.buildParameters()
		};
	}

}

exports.RequestBuilder = RequestBuilder;