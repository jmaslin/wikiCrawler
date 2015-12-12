var expect = require('chai').expect;

var fs 		 = require('fs');

var cheerio = require('cheerio');

var Parser = require('../build/parser.js').Parser;

var textToParse = JSON.parse(fs.readFileSync('test/data/day-response.json', 'utf8')).parse.text['*'];
// var $ = cheerio.load(textToParse);

// var sectionTitle = $('h2').children('span[class=mw-headline]').text();

// var length = $('ul').find('li').css('list-style', 'none').length;
// $('ul > li').each(function (index, element) {
// 	var listItemText = $(this).text();
// 	var year = listItemText.substring(0, listItemText.indexOf('\u2013')).trim();
// 	var name = listItemText.substring(listItemText.indexOf('\u2013')+2, listItemText.indexOf(','))

// 	var nameURI = $(this).children('a:contains('+name+')').attr('href');
// 	var yearURI = $(this).children('a:contains('+year+')').attr('href');
// });

describe('Parser', function () {
	
	var parser = new Parser(textToParse);

	it('exists', function () {
		expect(new Parser()).to.be.ok;
	});

	describe('parseListItem', function () {
		var $ = cheerio.load('<li><a href="/wiki/2003" title="2003">2003</a> – <a href="/wiki/Catharina-Amalia,_Princess_of_Orange" title="Catharina-Amalia, Princess of Orange">Catharina-Amalia, Princess of Orange</a></li>');
		var expected = {
			year: {
				text: '2003',
				uri: '/wiki/2003'
			},
			name: {
				text: 'Catharina-Amalia',
				uri: '/wiki/Catharina-Amalia,_Princess_of_Orange'
			}
		};
		var listItem = parser.parseListItem(0, $.html());
		
		it('should return a list item object', function () {
			expect(listItem).to.be.ok;
			expect(listItem).to.deep.eql(expected);
		});

	});

	describe('parseList', function () {


		it('should return an array', function () {
			expect(parser.parseList()).to.be.a('array');
		});	

		it('should be the correct length', function () {
			var expected = 211;
			expect(parser.parseList().length).to.equal(expected);
		});

	});

});

// getData
// load to cheerio
// parse list
// create list item object
// return object array
