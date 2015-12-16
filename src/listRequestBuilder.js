var moment = require('moment');

var RequestBuilder = require('./requestBuilder').RequestBuilder;

class ListRequestBuilder extends RequestBuilder {

  constructor(date, listType) {
    super(date);
    this._listType = listType;
  }

  buildParameters() {

    var output = {
      action: 'parse',
      prop: 'text',
      format: 'json'
    };

    output.section = this.listSectionNumber();
    output.page = super.formatDate();

    return output;
  }

  listSectionNumber() {
    var number; 
    switch (this._listType) {
      case 'births':
        number = 2;
        break;
      case 'deaths':
        number = 3;
        break;
    }
    return number;
  }

  transformResponse(data) {
    data = JSON.parse(data);
    return {
      title: data.parse.title,
      pageId: data.parse.pageid,
      text: data.parse.text['*']
    };
  }

  buildRequest() { 
    super.parameters = this.buildParameters();
    super.transformResponseFn = this.transformResponse;

    return super.buildRequest();
  }

}

exports.ListRequestBuilder = ListRequestBuilder;