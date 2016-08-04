var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));
    
exports.appear = function(driver) {

	// wait until the Small Carousel to be loaded, timeout 10s
	driver.wait(webdriver.until.elementLocated(webdriver.By.css(".global-social-feed")), 10000);

	var socialSection = driver.findElement(webdriver.By.css(".global-social-feed"));
	expect(socialSection.isDisplayed()).to.eventually.equal(true);

	return socialSection;

}
