var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    contentFeed1 = require('./content-feed-1.js');
    
exports.clickMore = function(driver) {

	// select The Latest tab and make sure there'are 7 items initially
	var feedLatest = contentFeed1.sevenItemsLatest(driver);
	var moreButton = driver.findElement(webdriver.By.css("#loadMedia"));

	// 13 items in The Latest after clicking More button

	moreButton.sendKeys(webdriver.Key.ESCAPE);	// need for firefox, optional for chrome	
	moreButton.click();
	// wait until button text no longer show loading
	// letter E appears in both other cases ('MORE FROM INSIDEHOOK' and 'THIS IS THE END')
	driver.wait(webdriver.until.elementTextContains(moreButton, 'E'), 5000);

	var items = feedLatest.findElements(webdriver.By.css("article"));
	items.then(function(items) {
		expect(items.length).to.equal(13);
	});
}
