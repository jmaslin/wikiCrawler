const endpoint = 'https://en.wikipedia.org/w/api.php';

class PersonRequestBuilder {

  constructor(person) {
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

  transformUri() {
    var uri = this._person.uri.replace('/wiki/', '');
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
    return {
      url: endpoint,
      params: this.buildParameters(),
      transformResponse: this.transformResponse
    };
  }

}

exports.PersonRequestBuilder = PersonRequestBuilder;