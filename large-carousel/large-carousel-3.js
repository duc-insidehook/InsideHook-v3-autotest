/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;

// Prerequisite Test
var	largeCarousel0 = require('./large-carousel-0.js');
    

/**
 *  Click and drag to advance the slide
 *	- drag right and left and expect changes in displaying slide's index
 */
exports.clickAndDrag = function(driver) {
	var activeText;
	freezeTheSlide(driver);
	getSlideIndex(driver).then(function(oldIndex) {
		
		// drag right and expect current slide's index to differ from initial slide's index
		driver.actions().dragAndDrop(activeText, {x: 300, y: 0}).perform(); driver.sleep(1000);
		freezeTheSlide(driver);
		getSlideIndex(driver).then(function(currentIndex) {
			expect(currentIndex, "cannot drag left").
				to.not.equal(oldIndex);
			
			// drag left and expect current slide's index to equal initial slide's index
			driver.actions().dragAndDrop(activeText, {x: -300, y: 0}).perform(); driver.sleep(1000);
			freezeTheSlide(driver);
			getSlideIndex(driver).then(function(currentIndex) {
				expect(currentIndex, "cannot drag right").
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
	var activeSlide = largeCarousel0.getActiveSlide(driver);
	var index = activeSlide.getAttribute('data-slick-index');
	return index;
}
