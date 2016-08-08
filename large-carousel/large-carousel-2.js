/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));

// Prerequisite Test
var	largeCarousel0 = require('./large-carousel-0.js');


/**
 *  Image and title block click through to appropriate destination
 *	- anchor contain img, h3, and h4
 *	- slide item clicks through to appropriate destination
 */
exports.imageAndTitle = function(driver) {

	// anchor contain img, h3, and h4
	var activeLink = largeCarousel0.getActiveSlideUrl(driver);
	activeLink.getInnerHtml().then(function(html) {
		expect(html).to.have.string('img').
								and.have.string('<h3').
								and.have.string('<h4');
	});

	// slide item clicks through to appropriate destination
	var activeLink = largeCarousel0.getActiveSlideUrl(driver);
	var slideUrl = activeLink.getAttribute('href');

	activeLink.click();
	driver.wait(webdriver.until.stalenessOf(activeLink), 10000);
	slideUrl.then(function(slideUrl) {
		expect(driver.getCurrentUrl()).to.eventually.equal(slideUrl);
	});

}
