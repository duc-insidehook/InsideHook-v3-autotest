var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    largeCarousel0 = require('./large-carousel-0.js');
    
exports.clickAndDrag = function(driver) {
	var activeText;
	freezeTheSlide(driver);
	getSlideIndex(driver).then(function(oldIndex) {
		
		// drag right and expect current slide's index to differ from initial slide's index
		driver.actions().dragAndDrop(activeText, {x: 300, y: 0}).perform(); driver.sleep(1000);
		freezeTheSlide(driver);
		getSlideIndex(driver).then(function(currentIndex) {
			expect(currentIndex).to.not.equal(oldIndex);
			
			// drag left and expect current slide's index to equal initial slide's index
			driver.actions().dragAndDrop(activeText, {x: -300, y: 0}).perform(); driver.sleep(1000);
			freezeTheSlide(driver);
			getSlideIndex(driver).then(function(currentIndex) {
				expect(currentIndex).to.equal(oldIndex);
			});
		});
	});

}


freezeTheSlide = function(driver) {
	// mouse over the title in the slide to stop auto advance
	activeText = largeCarousel0.getActiveSlideText(driver);
	driver.actions().mouseMove(activeText).perform(); driver.sleep(1000);
}

getSlideIndex = function(driver) {
	// get data slick index of the currently active slide
	var activeSlide = largeCarousel0.getActiveSlide(driver);
	index = activeSlide.getAttribute('data-slick-index');
	return index;
}
