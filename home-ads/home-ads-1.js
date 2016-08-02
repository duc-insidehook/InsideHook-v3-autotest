var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));
    
exports.bottomAdsAppear = function(driver) {

	var ads = driver.findElement(webdriver.By.css(".row.ad-bottom.hide-for-small"));
	expect(ads.isDisplayed()).to.eventually.equal(true);
	driver.actions().mouseMove(ads).perform();

	var frame = ads.findElement(webdriver.By.tagName("iframe"));
	frame.getSize().then(function(size) {
		expect(size.height).to.equal(90);
		expect(size.width).to.equal(728);
	});

	return frame;

}
