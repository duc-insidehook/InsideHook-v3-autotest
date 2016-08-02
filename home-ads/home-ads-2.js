var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    ads1 = require('./home-ads-1.js');
chai.use(require('chai-as-promised'));
    
exports.bottomAdsClick = function(driver) {

	var ads = ads1.bottomAdsAppear(driver);
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
