/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;

// Prerequisite Test
subContent4 = require('./sub-content-4.js');
    

/**
 *  "More from InsideHook" becomes "This Is The End" when no more items exist
 *	- wait until more articles appear
 *	- repeatedly click More button until it display 'This Is The End'
 */
exports.noMore = function(driver) {

	// wait until more articles appear
	subContent4.moreArticles(driver);

	// Repeatedly click More button until it display 'This Is The End'
	clickMoreButton(driver);
}


var clickMoreButton = function(driver) {

	var moreButton = driver.findElement(webdriver.By.css("#loadArtMedia"));
	
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
