var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    subContent4 = require('./sub-content-4.js');
    
exports.noMore = function(driver) {

	// wait until more articles appear
	subContent4.moreArticles(driver);

	clickMoreButton(driver);
}


clickMoreButton = function(driver) {

	var moreButton = driver.findElement(webdriver.By.css("#loadArtMedia"));
	
	moreButton.sendKeys(webdriver.Key.ESCAPE);	// need for firefox, optional for chrome	
	moreButton.click();
	// wait until button text no longer show loading
	// letter E appears in both other cases ('MORE FROM INSIDEHOOK' and 'THIS IS THE END')
	driver.wait(webdriver.until.elementTextContains(moreButton, 'E'), 5000);
	driver.sleep(1000);
	moreButton.getText().then(function(text) {	
		if (text == 'MORE FROM INSIDEHOOK') {
			clickMoreButton(driver);
		} else expect(text).to.equal('THIS IS THE END. YOU WIN.');
	});

}
