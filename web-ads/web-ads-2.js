/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));

// Prerequisite Test
var	ads1 = require('./web-ads-1.js');


/**
 *  728x90 clicks through to approrpiate destination
 *	- 728x90 appears below small carousel
 *	- click ad and print title
 */
exports.bottomAdsClick = function(driver) {

	// 728x90 appears below small carousel
	var ads = ads1.bottomAdsAppear(driver);
	
	// click ad and print title
	ads.click();
	driver.sleep(1000);
	driver.getAllWindowHandles().then(function(tabs) {
		expect(tabs.length, "ad cannot be clicked/ will not opened").
    	to.equal(2);
    	
    driver.switchTo().window(tabs[1]);
		driver.getTitle().then(function(title) {
			console.log("\tads redirect to \"" + title + "\"");
		});
		driver.close(); driver.switchTo().window(tabs[0]);
	});

}
