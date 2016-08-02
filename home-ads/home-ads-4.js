var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    ads3 = require('./home-ads-3.js');
chai.use(require('chai-as-promised'));
    
exports.railAdsClick = function(driver) {

	var ads = ads3.railAdsAppear(driver);
	ads.click();
	driver.sleep(1000);

	// add assertion to ads
	driver.getAllWindowHandles().then(function(tabs) {
    driver.switchTo().window(tabs[1]);
		driver.getTitle().then(function(title) {
			console.log("\tads redirect to \"" + title + "\"");
		});
		driver.close(); driver.switchTo().window(tabs[0]);
	});

}
