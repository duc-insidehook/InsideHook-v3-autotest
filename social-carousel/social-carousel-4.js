var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    socialCarousel3 = require('./social-carousel-3.js');
chai.use(require('chai-as-promised'));
    
exports.itemsFeature = function(driver, rawTemplate) {

	// get items from social carousel
	var slickItems = socialCarousel3.carouselItemsDisplay(driver, rawTemplate);
  slickItems.then(function(items) {

    // check Items size
    // skip first annd last four clones
    for (var i=4; i<(items.length-4); i++) {
      items[i].getSize().then(function(size) {
        expect(size.height).to.equal(300);
        expect(size.width).to.equal(300);
      });
    }

    // Only works on 'what-to-buy' category page
    // check description panel on Goods Items 
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
        })
      }
    })
  });

}
