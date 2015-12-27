const endpoint = 'https://en.wikipedia.org/w/api.php';

class PersonListRequestBuilder {

  constructor(people) {
    this._people = people;
  }

  buildParameters() {

    const numberOfSentences = '3';

    var output = {
      action: 'query',
      prop: 'extracts',
      exsentences: numberOfSentences,
      explaintext: '',
      redirects: '',
      exintro: '',
      exlimit: 'max',
      format: 'json'
    };

    output.titles = this.buildTitleParameter();

    return output;
  }

  buildTitleParameter() {
    var that = this;
    var title = "";
    this._people.forEach(function (person, index) {
      if (person.uri) {
        title += that.transformUri(person.uri);
        if (index !== (that._people.length - 1)) {
          title += "|";
        }
      }
    });
    return title;
  }

  transformUri(uri) {
    uri = uri.replace('/wiki/', '');
    uri = decodeURIComponent(uri);
    return uri;
  }

  transformResponse(data) {
    var parsedData = JSON.parse(data);
    // // var list;
    // return {
    //   list: parsedData.pages
    // };
    return parsedData;
  }

  buildRequest() { 
    return {
      url: endpoint,
      params: this.buildParameters(),
      transformResponse: this.transformResponse
    };
  }

}

exports.PersonListRequestBuilder = PersonListRequestBuilder;