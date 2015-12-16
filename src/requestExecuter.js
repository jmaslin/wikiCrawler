var axios = require('axios');

class RequestExecuter {

  constructor(requestObject) {
    this._requestObject = requestObject;
  }

  buildRequest() {
    return axios(this._requestObject);
  }

  sendRequest() {
    return this.buildRequest();
  }

}

exports.RequestExecuter = RequestExecuter;