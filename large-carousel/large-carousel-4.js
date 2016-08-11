/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;

// Prerequisite Test
var largeCarousel0 = require('./large-carousel-0.js');


/**
 *  Click the coins to advance the slide
 *	- start from the last coin
 *	- expect coin index to match slide index
 */
exports.slickCoins = function(driver) {

	// elements
	var slickCoins = driver.findElement(webdriver.By.css(".fs-slick .slick-dots"));
	var coins = slickCoins.findElements(webdriver.By.tagName("button"));

	coins.then(function(slickCoins) {

		// start from the last coin
		var coinIndex = coins.length-1;
		for (i=coins.length-1; i>=0; i--) {
			freezeTheSlide(driver);
			coins[i].click(); driver.sleep(1000);
			
			// expect coin index to match slide index
			var activeSlide = largeCarousel0.getActiveSlide(driver);
			activeSlide.getAttribute('data-slick-index').then(function(slideIndex) {
				expect(parseInt(slideIndex), "coins index do not match slides index").
					to.equal(coinIndex--);
			});
		}
	});

}

var freezeTheSlide = function(driver) {
	// mouse over the title in the slide to stop auto advance
	var activeText = largeCarousel0.getActiveSlideText(driver);
	driver.actions().mouseMove(activeText).perform(); driver.sleep(1000);
}
