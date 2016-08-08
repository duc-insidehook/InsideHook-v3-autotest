/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    assert = require('assert'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));


/**
 *  Five items appear in The Latest
 *  - click on the latest tab and expect 5 articles
 */
exports.fiveItemsLatest = function(driver) {
	
	// wait until content feed appears, timeout 10s
	driver.wait(webdriver.until.elementLocated(webdriver.By.linkText("THE LATEST")), 10000);

	// elements
	var buttonLatest = driver.findElement(webdriver.By.linkText("THE LATEST"));
	var feedLatest = driver.findElement(webdriver.By.css("#feed-latest"));

	buttonLatest.sendKeys(webdriver.Key.ESCAPE);	// need for firefox, optional for chrome	
	buttonLatest.click();
	driver.wait(webdriver.until.elementIsVisible(feedLatest), 5000);

	var items = feedLatest.findElements(webdriver.By.css("h4"));
	items.then(function(items) {
		expect(items.length).to.equal(5);	
	});
	
	return feedLatest;

}
