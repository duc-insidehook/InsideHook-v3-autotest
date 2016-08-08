/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));

// Prerequisite Test
var	ads3 = require('./home-ads-3.js');


/**
 *	300x600 clicks through to appropriate destination
 *	- 300x600 appears in right rail next to content feed
 *	- click ad and print title
 */
exports.railAdsClick = function(driver) {

	// 300x600 appears in right rail next to content feed
	var ads = ads3.railAdsAppear(driver);

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
