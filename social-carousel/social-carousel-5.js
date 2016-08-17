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
    expect(itemLinks.length, "number of displaying items is not 4").
      to.equal(4);

    // test opening a random item
    var index = Math.floor(Math.random() * itemLinks.length);
    var itemTitle = itemLinks[index].findElement(webdriver.By.css(".overlay.bottom.expand h3"));
    
    itemTitle.getText().then(function(itemTitle) {
      itemLinks[index].click(); driver.sleep(1000);

      // expect article from fb/instagram
      driver.getAllWindowHandles().then(function(tabs) {
        expect(tabs.length, "item cannot be clicked/ will not open").
          to.equal(2);

        driver.switchTo().window(tabs[1]);
        if( itemTitle == 'FACEBOOK') {
          expect(driver.getTitle(), "Facebook item does not link to Facebook\n").
            to.eventually.have.string("InsideHook - Timeline | Facebook");
        } 
        else if (itemTitle == 'INSTAGRAM') {
          expect(driver.getTitle(), "Instagram item does not link to Instagram\n").
            to.eventually.have.string("InsideHook on Instagram");
        } 
        else console.log("article is neither Facebook nor Instagram\n");

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
    var itemText = itemLinks[index].findElement(webdriver.By.css("h3"));
    itemText.getText().then(function(itemText) {

      itemLinks[index].sendKeys(webdriver.Key.ESCAPE);
      itemLinks[index].click();
      driver.wait(webdriver.until.stalenessOf(itemLinks[index]), 10000);

      expect(driver.getCurrentUrl(), "wrong destination\n").
        to.eventually.have.string(toUrlText(itemText));
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


/**
 *  Convert a string from a linkText to a string that appear in url
 */ 
var toUrlText = function(linkText) {

  // convert to lower case
    var str1 = linkText.toLowerCase();
  // replace space with dash
    var str2 = str1.replace(/ /g, "-");
  // replace & with and
    var str3 = str2.replace("&", "and");

  return str3;
}
