/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;

// Prerequisite Test
var contentFeed1 = require('./content-feed-1.js');
    

/**
 *  Clicking More From InsideHook button loads 6 more items for the selected tab
 *	- click on the latest tab and expect 7 articles initially
 *	- 13 items in The Latest after clicking More button
 */
exports.clickMore = function(driver) {

	// click on the latest tab and expect 7 articles initially
	var feedLatest = contentFeed1.sevenItemsLatest(driver);
	var moreButton = driver.findElement(webdriver.By.css("#loadMedia"));

	// 13 items in The Latest after clicking More button
	moreButton.sendKeys(webdriver.Key.ESCAPE);	// need for firefox, optional for chrome	
	moreButton.click();
	
	// button can display 'MORE FROM INSIDEHOOK', 'LOADING', or 'THIS IS THE END'
	driver.wait(webdriver.until.elementTextContains(moreButton, 'E'), 5000);

	var items = feedLatest.findElements(webdriver.By.css("article"));
	items.then(function(items) {
		expect(items.length).to.equal(13);
	});
	
}
