var cheerio = require('cheerio');

class ListParser {

	constructor(listToParse) {
		this.listToParse = listToParse;
	}

	get itemList() {
		return this.parseList();
	}

	parseList() {
		var that = this;
		var $ = cheerio.load(this.listToParse);

		var listData = [];

		$.root().find('li').each(function (index, element) {
			listData.push(that.parseListItem(index, element));
		});

		return listData;
	}

	parseListItem(index, element) {

		var $ = cheerio.load(element);
		var item = {};

		var yearText, yearURI, nameText, nameURI, nameArray;

		var listItemText = $(element).text();

		yearText = this.getListItemYear(listItemText);
		nameText = this.getListItemName(listItemText);

		nameArray = nameText.split(' ');

		nameURI = $('a:contains('+nameArray[0]+')').attr('href');
		yearURI = $('a:contains('+yearText+')').attr('href');

    item = {
      name: nameText,
      uri: nameURI,
      year: yearText
    };

		return item;
	}

	getListItemName(listItemText) {
		var nameText;
		if (listItemText.indexOf(',') === -1) {
			nameText = listItemText.substring(listItemText.indexOf('\u2013')+2, listItemText.length);
		} else {
			nameText = listItemText.substring(listItemText.indexOf('\u2013')+2, listItemText.indexOf(','));
		}
		return nameText;	
	}

	getListItemYear(listItemText) {
		return listItemText.substring(0, listItemText.indexOf('\u2013')).trim();
	}

}

exports.ListParser = ListParser;