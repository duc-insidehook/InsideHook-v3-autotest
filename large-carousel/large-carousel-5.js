/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;

// Prerequisite Test
var	largeCarousel0 = require('./large-carousel-0.js');


/**
 *	Click the arrows to advance the slide
 */
exports.slickArrows = function(driver) {

	// elements
	var slickPrev = driver.findElement(webdriver.By.css(".slick-prev.slick-arrow"));
	var slickNext = driver.findElement(webdriver.By.css(".slick-next.slick-arrow"));
	
	var activeText;
	freezeTheSlide(driver);
	getSlideIndex(driver).then(function(oldIndex) {
		
		// click prev and expect current slide's index to differ from initial slide's index
		slickPrev.click(); driver.sleep(1000);
		freezeTheSlide(driver);
		getSlideIndex(driver).then(function(currentIndex) {
			expect(currentIndex, "cannot click prev").
				to.not.equal(oldIndex);
			
			// click next and expect current slide's index to equal initial slide's index
			slickNext.click(); driver.sleep(1000);
			freezeTheSlide(driver);
			getSlideIndex(driver).then(function(currentIndex) {
				expect(currentIndex, "cannot click next").
					to.equal(oldIndex);
			});
		});
	});

}


var freezeTheSlide = function(driver) {
	// mouse over the title in the slide to stop auto advance
	activeText = largeCarousel0.getActiveSlideText(driver);
	driver.actions().mouseMove(activeText).perform(); driver.sleep(1000);
}

var getSlideIndex = function(driver) {
	// get data slick index of the currently active slide
	activeSlide = largeCarousel0.getActiveSlide(driver);
	var index = activeSlide.getAttribute('data-slick-index');
	return index;
}
