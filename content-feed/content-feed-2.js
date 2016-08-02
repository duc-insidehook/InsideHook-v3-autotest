var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));
    
exports.sevenItemsPicks = function(driver) {

	// wait until content feed appears, timeout 10s
	driver.wait(webdriver.until.elementLocated(webdriver.By.linkText("EDITOR'S PICKS")), 10000);

	// elements
	var buttonPicks = driver.findElement(webdriver.By.linkText("EDITOR'S PICKS"));
	var feedPicks = driver.findElement(webdriver.By.css("#feed-picks"));

	// 7 items in Editor's Picks
	buttonPicks.sendKeys(webdriver.Key.ESCAPE);	// need for firefox, optional for chrome	
	buttonPicks.click();
	driver.wait(webdriver.until.elementIsVisible(feedPicks), 5000);
	
	var items = feedPicks.findElements(webdriver.By.css("article"));
	items.then(function(items) {
		expect(items.length).to.equal(7);	
	});

	return feedPicks;

}
