/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;

// Prerequisite Test
subContent4 = require('./sub-content-4.js');


/**
 *  Clicking More From InsideHook button loads 6 more items for the selected tab
 *	- click More button and expect 12 articles
 */
exports.clickMore = function(driver) {

	var content = subContent4.moreArticles(driver);
	var grid = content[2];
	var moreButton = driver.findElement(webdriver.By.css("#loadArtMedia"));
	
	// click More button and expect 12 articles
	moreButton.sendKeys(webdriver.Key.ESCAPE);	// need for firefox, optional for chrome	
	moreButton.click();
	
	// button can display 'MORE FROM INSIDEHOOK', 'LOADING', or 'THIS IS THE END'
	driver.wait(webdriver.until.elementTextContains(moreButton, 'E'), 5000);

	var articles = grid.findElements(webdriver.By.css("article"));
	articles.then(function(articles) {
		expect(articles.length).to.equal(12);
	});
}
