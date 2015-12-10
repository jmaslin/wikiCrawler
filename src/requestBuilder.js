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
			format: 'json',			
		};

		output.page = this.formatDate();

		return output;
	}

	formatDate() {
		return moment(this.date).format('MMMM_D');
	}

}

exports.RequestBuilder = RequestBuilder;