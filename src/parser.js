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

		var listItemText = $(element).text();

		var year = listItemText.substring(0, listItemText.indexOf('\u2013')).trim();
		var name = listItemText.substring(listItemText.indexOf('\u2013')+2, listItemText.indexOf(','))

		var nameURI = $('a:contains('+name+')').attr('href');
		var yearURI = $('a:contains('+year+')').attr('href');

		item.year = {
			text: year,
			uri: yearURI
		};

		item.name = {
			text: name,
			uri: nameURI
		};

		return item;
	}

}

exports.Parser = Parser;