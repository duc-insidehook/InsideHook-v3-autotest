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
 *  Items click through to appropriate destination
 *  - social version - click and expect article from fb/instagram
 *  - subcat version - click and expect sub category link opened
 *  - goods version - click and print good item's page title
 */
exports.carouselItemsClick = function(driver, rawTemplate) {

	// retrieve social section 
  var socialSection = socialCarousel1.appear(driver);

  // choose version to operate
  if( rawTemplate=='main-category') {
    driver.getCurrentUrl().then(function(currentUrl) {
      if( currentUrl.includes('what-to-buy')) {
        goodsItemVersion(driver, socialSection);
      } else {  // 'where-to-go' or 'how-to-live'
        subCatVersion(driver, socialSection);
      }
    });
  }
  else {  // rawTemplate='home'
    socialVersion(driver, socialSection);
  }
}


var socialVersion = function(driver, socialSection) {
  
  /**
   *  Social Version
   *  - test opening a random item
   *  - expect article from fb/instagram
   */
  var itemLinks = socialSection.findElements(webdriver.By.css(".slick-track .feed-item.allow-overlay.left.slick-slide.slick-active a"));
  itemLinks.then(function(itemLinks) {
    expect(itemLinks.length, "number of displaying item is not 4").
      to.equal(4);

    // test opening a random item
    var index = Math.floor(Math.random() * itemLinks.length);
    itemLinks[index].getAttribute('href').then(function(itemUrl) {
      itemLinks[index].click(); driver.sleep(1000);

      // expect article from fb/instagram
      driver.getAllWindowHandles().then(function(tabs) {
        expect(tabs.length, "item cannot be clicked/ will not open").
          to.equal(2);

        driver.switchTo().window(tabs[1]);
        driver.getTitle().then(function(title) {
          if (title.includes("Facebook")) {
            expect(title).to.have.string("InsideHook - Timeline | Facebook");
          } else if (title.includes("Instagram")) {
            expect(title).to.have.string("InsideHook on Instagram");
          } else {
            expect(title, "article is neither Facebook nor Instagram\n").
              to.equal(null);
          }
        });
        driver.close(); driver.switchTo().window(tabs[0]);
      });
    });
  });
}


var subCatVersion = function(driver, socialSection) {

  /**
   *  Sub Category Version
   *  - test opening a random item
   */
  var itemLinks = socialSection.findElements(webdriver.By.css(".slick-track .feed-item.allow-overlay.left.slick-slide.slick-active a"));
  itemLinks.then(function(itemLinks) {
    expect(itemLinks.length, "number of displaying item is not 4").
      to.equal(4);

    // test opening a random item
    var index = Math.floor(Math.random() * itemLinks.length);
    itemLinks[index].getAttribute('href').then(function(itemUrl) {
      itemLinks[index].sendKeys(webdriver.Key.ESCAPE);
      itemLinks[index].click();
      driver.wait(webdriver.until.stalenessOf(itemLinks[index]), 10000);

      expect(driver.getCurrentUrl(), "wrong destination\n").
        to.eventually.equal(itemUrl);
    });
  });
}


var goodsItemVersion = function(driver, socialSection) {

  /**
   *  Goods Item Version
   *  - test opening a random item
   *  - print item's page title
   */

  var itemLinks = socialSection.findElements(webdriver.By.css(".slick-track .feed-item.allow-overlay.left.slick-slide.slick-active .th a"));
  itemLinks.then(function(itemLinks) {
    expect(itemLinks.length, "number of displaying item is not 4").
      to.equal(4);
    
    // test opening a random item
    var index = Math.floor(Math.random() * itemLinks.length);
    itemLinks[index].click(); driver.sleep(1000);

    // print item's page title
    driver.getAllWindowHandles().then(function(tabs) {
      expect(tabs.length, "item cannot be clicked/ will not open").
        to.equal(2);

      driver.switchTo().window(tabs[1]);
      driver.getTitle().then(function(title) {
        console.log("\tGoods item: "+title);
      });
      driver.close(); driver.switchTo().window(tabs[0]);
    });
  });
}

