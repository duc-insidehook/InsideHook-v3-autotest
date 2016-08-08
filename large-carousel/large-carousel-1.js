/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;

// Prerequisite Test
var	largeCarousel0 = require('./large-carousel-0.js');

/**
 *	Carousel auto advances
 *	- href check first-clone vs last-item, first-item vs last-clone
 *	- wait 3 seconds for carousel to auto advance
 */
exports.autoAdvance = function(driver) {

	// elements
  var slickTrack = driver.findElement(webdriver.By.css(".fs-slick .slick-track"));
	var trackItems = slickTrack.findElements(webdriver.By.tagName("a"));

	// href check first-clone vs last-item, first-item vs last-clone
	trackItems.then(function(trackItem) {
		var numOfItems = trackItem.length;

		trackItem[0].getAttribute('href').then(function(firstClone) {
			trackItem[numOfItems-2].getAttribute('href').then(function(lastItem) {
				expect(firstClone).to.equal(lastItem);
			});
		});

		trackItem[1].getAttribute('href').then(function(firstItem) {
			trackItem[numOfItems-1].getAttribute('href').then(function(lastClone) {
				expect(firstItem).to.equal(lastClone);
			});
		});
	});

	// wait 3 seconds for carousel to auto advance
	var activeLink = largeCarousel0.getActiveSlideUrl(driver);
	activeLink.getAttribute('href').then(function(oldSlide) {
		
		driver.sleep(3500);	// wait 3.5s for the slide to auto advance
		var activeLink = largeCarousel0.getActiveSlideUrl(driver);
		activeLink.getAttribute('href').then(function(newSlide) {
			expect(newSlide).to.not.equal(oldSlide);
		});
	});

}
