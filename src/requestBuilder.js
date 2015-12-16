var moment = require('moment');

class RequestBuilder {

  constructor(date) {
    this.date = date;
  }

  set parameters(parameters) {
    this._parameters = parameters;
  }

  get parameters() {
    return this._parameters;
  }

  set transformResponseFn(newFunction) {
    this._transformResponseFn = newFunction;
  }

  get transformResponseFn() {
    return this._transformResponseFn;
  }

  formatDate() {
    return moment(this.date).format('MMMM_D');
  }

  buildRequest() {
    var endpoint = 'https://en.wikipedia.org/w/api.php';

    return {
      url: endpoint,
      params: this._parameters,
      transformResponse: this._transformResponseFn
    };
  }

}

exports.RequestBuilder = RequestBuilder;