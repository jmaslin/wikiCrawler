var axios = require('axios');

class RequestExecuter {

  constructor(request) {
    this._request = request;
  }

  buildRequest() {
    var instance = axios.create({
      baseUrl: 'http://www.wikipedia.org'
    });
    return instance;
  }

  sendRequest() {
    return this.buildRequest().request(this._request);
  }

}

exports.RequestExecuter = RequestExecuter;