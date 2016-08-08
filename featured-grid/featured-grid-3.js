/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));

// Prerequisite Test
var featuredGrid0 = require('./featured-grid-0.js');


/**
 *  Three grid items appear as expected
 *	- check articles' date, hour, edition
 *	- check image url's and title's url
 */
exports.gridItemDisplay = function(driver) {

	// retrieve grid
	var contentGrid = featuredGrid0.gridItemAppear(driver);
	var gridArticles = contentGrid.findElements(webdriver.By.tagName("article"));
	
	gridArticles.then(function(articles) {
		expect(articles.length).to.equal(3);

		var titleUrl = new Array(),
				titleIndex = 0;  // use to loop through titleUrl

		for(i=0; i<articles.length; i++) {
			// check articles' date, hour, edition
			expect(articles[i].getAttribute("data-index")).to.eventually.not.equal(null);
			expect(articles[i].getAttribute("data-date")).to.eventually.not.equal(null);
			expect(articles[i].getAttribute("data-hour")).to.eventually.not.equal(null);
			expect(articles[i].getAttribute("data-edition")).to.eventually.not.equal(null);

			// check image url's and title's url
			var imageUrl = articles[i].findElement(webdriver.By.css(".th a")).getAttribute('href');
			titleUrl[i] = articles[i].findElement(webdriver.By.css(".panel h3 a")).getAttribute('href');
			imageUrl.then(function(imageUrl) {
				expect(titleUrl[titleIndex++], "image's url and title's url don't match\n").
					to.eventually.equal(imageUrl);
			});
		}
	});

	return gridArticles;

}
