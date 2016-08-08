/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));

// Prerequisite Test
var	subContent4 = require('./sub-content-4.js');


/**
 *  Featured article clicks through to appropriate destination
 */
exports.clickFeatured = function(driver) {

	var content = subContent4.moreArticles(driver);
	var featured = content[0];

	featured.then(function(featured) {
		var anchor = featured.findElement(webdriver.By.css(".panel a"));

		anchor.getAttribute('href').then(function(linkUrl) {
			anchor.sendKeys(webdriver.Key.ESCAPE);	// need for firefox, optional for chrome	
			anchor.click();
					
			driver.wait(webdriver.until.stalenessOf(anchor), 10000);
			expect(driver.getCurrentUrl()).to.eventually.equal(linkUrl);
		});
	});

}
