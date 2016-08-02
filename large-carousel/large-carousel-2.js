var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    largeCarousel0 = require('./large-carousel-0.js');
chai.use(require('chai-as-promised'));
    
exports.imageAndTitle = function(driver) {

	// make sure anchor contain img, h3, and h4
	var activeLink = largeCarousel0.getActiveSlideUrl(driver);
	activeLink.getInnerHtml().then(function(html) {
		expect(html).to.have.string('img').
								and.have.string('<h3').
								and.have.string('<h4');
	});

	// slide clicks through to appropriate destination
	var activeLink = largeCarousel0.getActiveSlideUrl(driver);
	var slideUrl = activeLink.getAttribute('href');

	activeLink.click();
	driver.wait(webdriver.until.stalenessOf(activeLink), 10000);
	slideUrl.then(function(slideUrl) {
		expect(driver.getCurrentUrl()).to.eventually.equal(slideUrl);
	});

}
