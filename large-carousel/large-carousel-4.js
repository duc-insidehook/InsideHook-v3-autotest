var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    largeCarousel0 = require('./large-carousel-0.js');

exports.slickCoins = function(driver) {

	// elements
	var slickCoins = driver.findElement(webdriver.By.css(".fs-slick .slick-dots"));
	var coins = slickCoins.findElements(webdriver.By.tagName("button"));

	coins.then(function(coin) {
		var coinIndex = coin.length-1;
		// click on each coin and expect the currently displaying slide's index 
		// to equal its corresponding coin's index
		for (i=coin.length-1; i>=0; i--) {
			freezeTheSlide(driver);
			coin[i].click(); driver.sleep(1000);
			
			var activeSlide = largeCarousel0.getActiveSlide(driver);
			activeSlide.getAttribute('data-slick-index').then(function(slideIndex) {
				expect(parseInt(slideIndex)).to.equal(coinIndex--);
			});
		}
	});

}

freezeTheSlide = function(driver) {
	// mouse over the title in the slide to stop auto advance
	var activeText = largeCarousel0.getActiveSlideText(driver);
	driver.actions().mouseMove(activeText).perform(); driver.sleep(1000);
}
