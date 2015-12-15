var axios = require('axios');

axios.interceptors.response.use(function (response) {
  response.data = {
    title: response.data.parse.title,
    pageId: response.data.parse.pageid,
    text: response.data.parse.text['*']
  };
  return response;
}, function (error) {
  return Promise.reject(error);
});

class RequestExecuter {

  constructor(requestObject) {
    this.requestObject = requestObject;
  }

  buildRequest() {
    return axios(this.requestObject);
  }

  sendRequest() {
    return this.buildRequest();
  }

}

exports.RequestExecuter = RequestExecuter;