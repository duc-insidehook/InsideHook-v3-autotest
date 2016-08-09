/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));


/**
 *  300x600 appears in right rail next to content feed
 */
exports.railAdsAppear = function(driver) {

	driver.wait(webdriver.until.elementLocated(webdriver.By.css(".ad.ad-300x600.text-center")), 5000);
	
	var ads = driver.findElement(webdriver.By.css(".ad.ad-300x600.text-center"));
	expect(ads.isDisplayed()).to.eventually.equal(true);
	driver.actions().mouseMove(ads).perform();
	
	var frame = ads.findElement(webdriver.By.tagName("iframe"));
	frame.getSize().then(function(size) {
		expect(size.height, "height is not 600").
			to.equal(600);
		expect(size.width, "wdith is not 300").
			to.equal(300);
	});

	return frame;

}
