/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;

// Prerequisite Test
var contentFeed1 = require('./content-feed-1.js');


/**
 *  "More from InsideHook" becomes "This Is The End" when no more items exist
 *	- click on the latest tab and expect 7 articles initially
 *	- repeatedly click More button until it display 'This Is The End'
 */
exports.noMore = function(driver) {

	// select The Latest tab and make sure there'are 7 items initially
	contentFeed1.sevenItemsLatest(driver);

	// Repeatedly click More button until it display 'This Is The End'
	clickMoreButton(driver);
}


var clickMoreButton = function(driver) {

	var moreButton = driver.findElement(webdriver.By.css("#loadMedia"));

	moreButton.sendKeys(webdriver.Key.ESCAPE);	// need for firefox, optional for chrome	
	moreButton.click();
	
	// button can display 'MORE FROM INSIDEHOOK', 'LOADING', or 'THIS IS THE END'
	driver.wait(webdriver.until.elementTextContains(moreButton, 'E'), 5000);
	driver.sleep(1000);
	moreButton.getText().then(function(text) {	
		if (text == 'MORE FROM INSIDEHOOK') {
			clickMoreButton(driver);
		} else expect(text).to.equal('THIS IS THE END. YOU WIN.');
	});

}
