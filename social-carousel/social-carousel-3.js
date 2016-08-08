/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));

// Prerequisite Test
var socialCarousel1 = require('./social-carousel-1.js'),
    subcatHeader1 = require('../subcat-header/subcat-header-1.js');


/**
 *  Display correct items
 *  - social version - fb and instagram items (home page)
 *  - subcat version - sub categories items (main-category page)
 *  - goods version - goods items (what-to-buy page)
 */
exports.carouselItemsDisplay = function(driver, rawTemplate) {

	// retrieve social section 
	var socialSection = socialCarousel1.appear(driver);
  var slickItems = socialSection.findElements(webdriver.By.css(".slick-track .feed-item.allow-overlay.left.slick-slide"));
  
  // choose version to operate
  if( rawTemplate=='main-category') {
    driver.getCurrentUrl().then(function(currentUrl) {
      if( currentUrl.includes('what-to-buy')) {
        goodsVersion(socialSection);
      } else {  // 'where-to-go' or 'how-to-live'
        subCatVersion(driver, socialSection);
      }
    });
  }
  else {  // rawTemplate='home'
    socialVersion(socialSection);
  }

  return slickItems;
}


var socialVersion = function(socialSection) {

  /**
   *  Social Version
   *  - expect 10 items: 5 from Facebook and 5 from Instagram
   */
  var itemsLink = socialSection.findElements(webdriver.By.css(".slick-track .feed-item.allow-overlay.left.slick-slide a"));

  itemsLink.then(function(items) {
    expect(items.length).to.equal(18); // 10 items + 8 clones
      var totalUrl = 0, fbUrl = 0, gramUrl = 0;

      // skip first annd last four clones
      for (i=4; i<(items.length-4); i++) {
        items[i].getAttribute('href').then(function(text) {
          totalUrl++;
          if( text.includes('instagram.com')) {gramUrl++;}
          if( text.includes('facebook.com')) {fbUrl++;}
          if( totalUrl==10 ) {
            expect(gramUrl).to.equal(5);
            expect(fbUrl).to.equal(5);
          }
        });
      }
  });
}


var subCatVersion = function(driver, socialSection) {

  /**
   *  Sub Categories Version
   *  - retrieve subcat form subcat-header test
   *  - check subcat's url from header and subcat's url from carousel
   */
  var itemsLink = socialSection.findElements(webdriver.By.css(".slick-track .feed-item.allow-overlay.left.slick-slide a"));
  var carouselUrl = new Array(),
      carouselIndex = 0; // use to loop through carouselUrl array

  itemsLink.then(function(carouselItems) {
    // retrieve subcat from subcat-header test
    var subcat = subcatHeader1.appear(driver);
    subcat.then(function(subcat) {

      // check subcat's url from header and subcat's url from carousel
      for( var i=0; i<subcat.length; i++) {
        carouselUrl[i] = carouselItems[i+4].getAttribute('href');
        subcat[i].getAttribute('href').then(function(subcatUrl) {

          if( subcatUrl!=null) {
            carouselUrl[carouselIndex++].then(function(carouselUrl) {
              expect(subcatUrl).to.equal(carouselUrl);
            });
          }
        });
      }
    });
  });
}


var goodsVersion = function(socialSection) {
  
  /**
   *  Good Items Version
   *  - check items' index, date
   *  - check image url's and title's url
   */
  
  // check items' index, date
  articles = socialSection.findElements(webdriver.By.css(".slick-track article"));
  articles.then(function(articles) {

    var titleUrl = new Array(),
        titleIndex = 0; // use to loop through titleUrl array

    for(i=0; i<articles.length; i++) {
      // check items' index, date
      expect(articles[i].getAttribute("data-index")).to.eventually.not.equal(null);
      expect(articles[i].getAttribute("data-date")).to.eventually.not.equal(null);
    
      // check image url's and title's url
      var imageUrl = articles[i].findElement(webdriver.By.css(".th a")).getAttribute('href');
      titleUrl[i] = articles[i].findElement(webdriver.By.css("h3 a")).getAttribute('href');
      imageUrl.then(function(imageUrl) {
        expect(titleUrl[titleIndex++]).to.eventually.equal(imageUrl);
      });
    }

  });
}
