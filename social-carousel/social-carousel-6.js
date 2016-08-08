/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));
    
// Prerequisite Test
var socialCarousel1 = require('./social-carousel-1.js');


/**
 *  Click and drag to advance the slide
 */
exports.clickAndDrag = function(driver) {

	// wait for Insidehook on Social section to appear
	socialCarousel1.appear(driver);

  getSlideIndex(driver).then(function(oldIndex) {
    driver.actions().mouseMove(activeSlide).perform(); driver.sleep(1000);

    // drag right and expect current slide's index to differ from initial slide's index
    driver.actions().dragAndDrop(activeSlide, {x: 120, y: 0}).perform(); driver.sleep(1000);
    getSlideIndex(driver).then(function(currentIndex) {
      expect(currentIndex).to.not.equal(oldIndex);
      
      // drag left and expect current slide's index to equal initial slide's index
      driver.actions().dragAndDrop(activeSlide, {x: -120, y: 0}).perform(); driver.sleep(1000);
      getSlideIndex(driver).then(function(currentIndex) {
        expect(currentIndex).to.equal(oldIndex);
      });
    });
  });

}


var getSlideIndex = function(driver) {
  // get data slick index of the currently active slide
  activeSlide = driver.findElement(webdriver.By.css(".feed-item.allow-overlay.left.slick-slide.slick-current.slick-active"));
  var index = activeSlide.getAttribute('data-slick-index');
  return index;
}
