var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    subContent4 = require('./sub-content-4.js');
    
exports.clickMore = function(driver) {

	var content = subContent4.moreArticles(driver);
	var grid = content[2];
	var moreButton = driver.findElement(webdriver.By.css("#loadArtMedia"));
	
	// 12 articles after clicking More button
	moreButton.sendKeys(webdriver.Key.ESCAPE);	// need for firefox, optional for chrome	
	moreButton.click();
	// wait until button text no longer show loading
	// letter E appears in both other cases ('MORE FROM INSIDEHOOK' and 'THIS IS THE END')
	driver.wait(webdriver.until.elementTextContains(moreButton, 'E'), 5000);

	var articles = grid.findElements(webdriver.By.css("article"));
	articles.then(function(articles) {
		expect(articles.length).to.equal(12);
	});
}
