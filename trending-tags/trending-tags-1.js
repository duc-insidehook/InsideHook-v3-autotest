/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));


/**
 *  Four trending tags display
 */
exports.tagsDisplay = function(driver) {

	var trendingTags = driver.findElement(webdriver.By.css(".global-trending"));
	expect(trendingTags.isDisplayed()).to.eventually.equal(true);

	var tags = trendingTags.findElements(webdriver.By.css(".th"));
	tags.then(function(tags) {
		expect(tags.length).to.equal(4);
	})

	return tags;

}
