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
		expect(numOfItems, "carousel does not have more than 1 slide").
			to.be.above(1);

		trackItem[0].getAttribute('href').then(function(firstClone) {
			trackItem[numOfItems-2].getAttribute('href').then(function(lastItem) {
				expect(firstClone, "first-clone and last-item do not match\n").
					to.equal(lastItem);
			});
		});

		trackItem[1].getAttribute('href').then(function(firstItem) {
			trackItem[numOfItems-1].getAttribute('href').then(function(lastClone) {
				expect(firstItem, "first-item and last-clone do not match\n").
					to.equal(lastClone);
			});
		});
	});

	// wait 3 seconds for carousel to auto advance
	var activeLink = largeCarousel0.getActiveSlideUrl(driver);
	activeLink.getAttribute('href').then(function(oldSlide) {
		
		driver.sleep(3500);
		var activeLink = largeCarousel0.getActiveSlideUrl(driver);
		activeLink.getAttribute('href').then(function(newSlide) {
			expect(newSlide, "carousel does not auto advance after 3s\n").
				to.not.equal(oldSlide);
		});
	});

}
