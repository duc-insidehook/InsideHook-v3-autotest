/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));

// Prerequisite Test
var socialCarousel3 = require('./social-carousel-3.js');


/**
 *  300x300 for each item, goods item have description panel
 *  - retrieve slick items
 *  - 300x300 for each item
 *  - toggle description panel (what-to-buy template only)
 */
exports.itemsFeature = function(driver, rawTemplate) {

	// retrieve slick items
	var slickItems = socialCarousel3.carouselItemsDisplay(driver, rawTemplate);
  slickItems.then(function(items) {

    // 300x300 for each item
    for (var i=4; i<(items.length-4); i++) {
      items[i].getSize().then(function(size) {
        expect(size.height, "item height is not 300").
          to.equal(300);
        expect(size.width, "item width is not 300").
          to.equal(300);
      });
    }

    // toggle description panel (what-to-buy template only) 
    driver.getCurrentUrl().then(function(currentUrl) {
      if( currentUrl.includes('what-to-buy')) {
        var activeSlides = driver.findElements(webdriver.By.css(".slick-track .feed-item.allow-overlay.left.slick-slide.slick-active"));
        activeSlides.then(function(activeSlides) {
          
          // test a random item
          var index = Math.floor(Math.random() * activeSlides.length);
          var backPanel = activeSlides[index].findElement(webdriver.By.css(".back-panel"));
          var moreButton = activeSlides[index].findElement(webdriver.By.css("button"));
          activeSlides[index].sendKeys(webdriver.Key.ESCAPE);
          driver.actions().mouseMove(activeSlides[index]).perform();
          driver.sleep(1000);

          // toggle front and back panel
          moreButton.click();
          driver.wait(webdriver.until.elementIsVisible(backPanel), 5000);
          driver.sleep(1000);
          moreButton.click();
          driver.wait(webdriver.until.elementIsNotVisible(backPanel), 5000);
          driver.sleep(1000);
        });
      }
    });
  });

}
