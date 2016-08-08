/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));

// Prerequisite Test
var featuredGrid3 = require('./featured-grid-3.js');


/**
 *  Grid items click through to appropriate destination
 *	- grid items appear as expected
 *	- open a one of the grid articles
 */
exports.gridItemClick = function(driver) {

	// grid items appear as expected
	var gridArticles = featuredGrid3.gridItemDisplay(driver);
	gridArticles.then(function(articles) {

		// open a one of the grid articles
		var index = Math.floor(Math.random() * articles.length);
		var articleLink = articles[index].findElement(webdriver.By.css(".th a"));
		articleLink.getAttribute('href').then(function(linkUrl) {
			articleLink.click();
			
			driver.wait(webdriver.until.stalenessOf(articleLink), 10000);
			expect(driver.getCurrentUrl()).to.eventually.equal(linkUrl);
		});
	});

}
