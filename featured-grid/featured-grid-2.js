/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));

// Prerequisite Test
var featuredGrid1 = require('./featured-grid-1.js');


/**
 *  Featured items clicks through to appropriate destination
 *	- title and image click through to appropriate destination
 */
exports.featuredItemClick = function(driver, rawTemplate) {

	/**
	 *	Type of test
	 *	1 - test featured title
	 *	2 - test featured image
	 */
	var typeOfTest = Math.floor(Math.random() * 2);

	if( typeOfTest==0) {
		var feature = featuredGrid1.opaqueOnHover(driver, rawTemplate);
		var featuredTitle = feature.findElement(webdriver.By.css(".panel h2 a"));
		featuredTitle.getAttribute("href").then(function(linkUrl) {
			featuredTitle.click();

			driver.wait(webdriver.until.stalenessOf(feature), 10000);
			expect(driver.getCurrentUrl(), "title clicks to wrong desitnation\n").to.eventually.equal(linkUrl);
		});
	}

	else {
		var feature = featuredGrid1.opaqueOnHover(driver, rawTemplate);
		var anchor = feature.findElement(webdriver.By.css("a"));
		expect(anchor.getInnerHtml()).to.eventually.have.string("<img");
		anchor.getAttribute("href").then(function(linkUrl) {
			/**
			 *	Note:
			 *	normal direct click on the article would result in clicking in the middle of the article,
			 *	test will fail because the text paragraph panel will receive the click instead
			 *	this action sequence move 100 pixels away from the top left corner of the feature article and click
			 */
			new webdriver.ActionSequence(driver).
	  			mouseMove(feature, {x:100, y:100}).
	  			click().perform(); 

	  	driver.wait(webdriver.until.stalenessOf(feature), 10000);
	  	expect(driver.getCurrentUrl(), "image clicks to wrong destination\n").to.eventually.equal(linkUrl);
		});
	}

}
