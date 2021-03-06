/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));


/**
 *  728x90 appears below small carousel
 */
exports.bottomAdsAppear = function(driver) {

	var ads = driver.findElement(webdriver.By.css(".row.ad-bottom.hide-for-small"));
	expect(ads.isDisplayed()).to.eventually.equal(true);
	driver.actions().mouseMove(ads).perform();

	var frame = ads.findElement(webdriver.By.tagName("iframe"));
	frame.getSize().then(function(size) {
		expect(size.height, "heigh is not 90").
			to.equal(90);
		expect(size.width, "width is not 728").
			to.equal(728);
	});

	return frame;

}
