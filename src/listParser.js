var cheerio = require('cheerio');

class ListParser {

	constructor(listToParse) {
		this._listToParse = listToParse;
	}

	get itemList() {
		return this.parseList();
	}

	parseList() {
		var that = this;
		var $ = cheerio.load(this._listToParse);

		var listData = [];

		$.root().find('li').each(function (index, element) {
			var item = that.parseListItem(index, element);
			if (item) {
				listData.push(item);
			}
		});

		return listData;
	}

	parseListItem(index, element) {

		var $ = cheerio.load(element);
		var item = {};

		var yearURI, nameArray;

		var listItemText = $(element).text();

		item.year = this.getListItemYear(listItemText);
		yearURI = $('a:contains('+item.year+')').attr('href');

		var links = $(element).find('a');

		if (yearURI && links.length > 1) {
			item.uri = $(links[1]).attr('href');
			item.name = $(links[1]).text();
		} else if (links.length > 0) {
			item.uri = $(links[0]).attr('href');
			item.name = $(links[0]).text();
		} else {
			return;
		}

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