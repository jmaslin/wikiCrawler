var moment = require('moment');
const endpoint = 'https://en.wikipedia.org/w/api.php';

class ListRequestBuilder {

  constructor(date, listType) {
    this._date = date;
    this._listType = listType;
  }

  buildParameters() {

    var output = {
      action: 'parse',
      prop: 'text',
      format: 'json'
    };

    output.section = this.listSectionNumber();
    output.page = this.formatDate();

    return output;
  }

  formatDate() {
    return moment(this._date).format('MMMM_D');
  }

  listSectionNumber() {
    // todo: this should be a separate lookup 
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
    return {
      url: endpoint,
      params: this.buildParameters(),
      transformResponse: this.transformResponse
    };
  }

}

exports.ListRequestBuilder = ListRequestBuilder;