var RequestBuilder = require('./requestBuilder').RequestBuilder;

class PersonRequestBuilder extends RequestBuilder {

  constructor(person) {
    super();
    this._person = person;
  }

  buildParameters() {

    const numberOfSentences = '3';

    var output = {
      action: 'query',
      prop: 'extracts',
      exsentences: numberOfSentences,
      explaintext: '',
      redirects: '',
      format: 'json'
    };

    output.titles = this.transformUri(this._person.uri);

    return output;
  }

  transformUri(uri) {
    uri = uri.replace('/wiki/', '');
    uri = decodeURIComponent(uri);
    return uri;
  }

  transformResponse(data) {
    var parsedData = JSON.parse(data);
    var pageId = Object.keys(parsedData.query.pages)[0];
    return {
      name: parsedData.query.pages[pageId].title,
      pageId: pageId,
      text: parsedData.query.pages[pageId].extract
    };
  }

  buildRequest() { 
    super.parameters = this.buildParameters();
    super.transformResponseFn = this.transformResponse;

    return super.buildRequest();
  }

}

exports.PersonRequestBuilder = PersonRequestBuilder;