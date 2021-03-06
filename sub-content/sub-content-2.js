/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));

/**
 *  Five items appear in Editor's Picks
 *  - click on the editor's picks tab and expect 5 articles
 */    
exports.fiveItemsPicks = function(driver) {

	driver.wait(webdriver.until.elementLocated(webdriver.By.linkText("EDITOR'S PICKS")), 10000);

	var buttonPicks = driver.findElement(webdriver.By.linkText("EDITOR'S PICKS"));
	var feedPicks = driver.findElement(webdriver.By.css("#feed-picks"));

	// click on editor's picks tab and expect 5 articles
	buttonPicks.sendKeys(webdriver.Key.ESCAPE);	// need for firefox, optional for chrome	
	buttonPicks.click();
	driver.wait(webdriver.until.elementIsVisible(feedPicks), 5000);
	
	var items = feedPicks.findElements(webdriver.By.css("h4"));
	items.then(function(items) {
		expect(items.length).to.equal(5);
	});

	return feedPicks;

}
