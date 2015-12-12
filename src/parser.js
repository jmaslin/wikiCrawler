var cheerio = require('cheerio');

class Parser {

	constructor(textToParse) {
		this.textToParse = textToParse;
		if (textToParse) {
			this.$ = cheerio.load(textToParse);
		}
	}

	get itemList() {
		return this.parseList();
	}

	parseList() {
		var parseItem = this.parseListItem;
		var list = this.$('ul').clone();

		var listData = [];

		this.$(list).find('li').each(function (index, element) {
			listData.push(parseItem(index, element));
		});

		return listData;
	}

	parseListItem(index, element) {

		var $ = cheerio.load(element);
		var item = {};

		var yearText, yearURI, nameText, nameURI, nameArray;

		var listItemText = $(element).text();

		yearText = listItemText.substring(0, listItemText.indexOf('\u2013')).trim();

		if (listItemText.indexOf(',') === -1) {
			nameText = listItemText.substring(listItemText.indexOf('\u2013')+2, listItemText.length);
		} else {
			nameText = listItemText.substring(listItemText.indexOf('\u2013')+2, listItemText.indexOf(','));
		}

		nameArray = nameText.split(' ');

		nameURI = $('a:contains('+nameArray[0]+')').attr('href');
		yearURI = $('a:contains('+yearText+')').attr('href');
		
		item.year = {
			text: yearText,
			uri: yearURI
		};

		item.name = {
			text: nameText,
			uri: nameURI
		};

		return item;
	}

}

exports.Parser = Parser;