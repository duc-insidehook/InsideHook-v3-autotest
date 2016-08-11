/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));
    

/**
 *  7 items appear in The Lastest
 *	- click on the latest tab and expect 7 articles
 */
exports.sevenItemsLatest = function(driver) {
	
	driver.wait(webdriver.until.elementLocated(webdriver.By.linkText("THE LATEST")), 10000);

	var buttonLatest = driver.findElement(webdriver.By.linkText("THE LATEST"));
	var feedLatest = driver.findElement(webdriver.By.css("#feed-latest"));

	// click on the latest tab and expect 7 articles
	buttonLatest.sendKeys(webdriver.Key.ESCAPE);	// need for firefox, optional for chrome	
	buttonLatest.click();
	driver.wait(webdriver.until.elementIsVisible(feedLatest), 5000);

	var items = feedLatest.findElements(webdriver.By.css("article"));
	items.then(function(items) {
		expect(items.length).to.equal(7);	
	});
	
	return feedLatest;

}
