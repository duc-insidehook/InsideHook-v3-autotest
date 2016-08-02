var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    socialCarousel1 = require('./social-carousel-1.js');
chai.use(require('chai-as-promised'));
    
exports.carouselItemsDisplay = function(driver, rawTemplate) {

	// wait for the small carousel to appear
	var socialSection = socialCarousel1.appear(driver);
  var slickItems = socialSection.findElements(webdriver.By.css(".slick-track .feed-item.allow-overlay.left.slick-slide"));
  slickItems.then(function(items) {

    // Test on main category template
    // expect all subcategory are from the main category
    if( rawTemplate=='category') {
      driver.getCurrentUrl().then(function(currentUrl) {
        if( currentUrl.includes('what-to-buy')) {

        }
        else { // where-to go or how to live
          var subCategories = getSubcategories(driver);
          subCategories.then(function(subCategories) {
            expect(subCategories.length+8).to.equal(items.length);

          });
        }
      });

    }

    // Test on home template
    // expect 10 items: 5 from Facebook and 5 from Instagram
    else {
      expect(items.length).to.equal(18); // 10 items + 8 clones
      var totalUrl = 0, fbUrl = 0, gramUrl = 0;

      // skip first annd last four clones
      for (i=4; i<(items.length-4); i++) {
        var social = items[i].findElement(webdriver.By.css("a"));
        social.getAttribute('href').then(function(text) {
          totalUrl++;
          if( text.includes('instagram.com')) {gramUrl++;}
          if( totalUrl==10 ) {
            expect(gramUrl).to.equal(5);
          }
        });
      }
    }

  });

  return slickItems;

}


getSubcategories = function(driver) {
  var subCategories = driver.findElements(webdriver.By.css("#drop-morecat a"));
  return subCategories;
}
