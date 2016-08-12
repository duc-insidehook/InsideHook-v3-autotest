/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;

// Prerequisite Test
var contentGood1 = require('./content-good-1.js');
    

/**
 *  Clicking More From InsideHook button loads 12 more good items
 *	- expect 12 good items initially
 *	- 24 good items after clicking More button
 */
exports.clickMore = function(driver) {

	// expect 12 good items initially
	var goods = contentGood1.twelveGoods(driver);
	var moreButton = driver.findElement(webdriver.By.css("#loadGoods"));

	// 24 good items after clicking More button
	moreButton.sendKeys(webdriver.Key.ESCAPE);	// need for firefox, optional for chrome	
	moreButton.click();
	
	// button can display 'MORE FROM INSIDEHOOK', 'LOADING', or 'THIS IS THE END'
	driver.wait(webdriver.until.elementTextContains(moreButton, 'E'), 5000);

	var items = goods.findElements(webdriver.By.css("article"));
	items.then(function(items) {
		expect(items.length).to.equal(24);
	});
	
}
