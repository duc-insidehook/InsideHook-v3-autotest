var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    socialCarousel1 = require('./social-carousel-1.js');
chai.use(require('chai-as-promised'));
    

exports.carouselItemsClick = function(driver, rawTemplate) {

	// wait for Insidehook on Social section to appear
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
  
  // click and expect article on Facebook or Instagram 
  var itemLinks = socialSection.findElements(webdriver.By.css(".slick-track .feed-item.allow-overlay.left.slick-slide.slick-active a"));
  itemLinks.then(function(itemLinks) {
    // expect 4 items appear at maximum window size
    expect(itemLinks.length).to.equal(4);
    // test opening a random item
    var index = Math.floor(Math.random() * itemLinks.length);
    itemLinks[index].getAttribute('href').then(function(itemUrl) {
      itemLinks[index].click(); driver.sleep(1000);

      driver.getAllWindowHandles().then(function(tabs) {
        expect(tabs.length).to.equal(2);

        driver.switchTo().window(tabs[1]);
        driver.getTitle().then(function(title) {
          if (title.includes("Facebook")) {
            expect(title).to.have.string("InsideHook - Timeline | Facebook");
          } else if (title.includes("Instagram")) {
            expect(title).to.have.string("InsideHook on Instagram");
          } else {
            expect(title, "article is neither Facebook nor Instagram").to.equal(null);
          }
        });
        driver.close(); driver.switchTo().window(tabs[0]);
      });
    });
  });
}


var subCatVersion = function(driver, socialSection) {

  // click and expect sub category link opened
  var itemLinks = socialSection.findElements(webdriver.By.css(".slick-track .feed-item.allow-overlay.left.slick-slide.slick-active a"));
  itemLinks.then(function(itemLinks) {
    // expect 4 items appear at maximum window size
    expect(itemLinks.length).to.equal(4);
    // test opening a random item
    var index = Math.floor(Math.random() * itemLinks.length);
    itemLinks[index].getAttribute('href').then(function(itemUrl) {
      itemLinks[index].sendKeys(webdriver.Key.ESCAPE);
      itemLinks[index].click();
      driver.wait(webdriver.until.stalenessOf(itemLinks[index]), 10000);

      expect(driver.getCurrentUrl()).to.eventually.equal(itemUrl);
    });
  });
}


var goodsItemVersion = function(driver, socialSection) {

  // click and expect article on Facebook or Instagram 
  var itemLinks = socialSection.findElements(webdriver.By.css(".slick-track .feed-item.allow-overlay.left.slick-slide.slick-active .th a"));
  itemLinks.then(function(itemLinks) {
    // expect 4 items appear at maximum window size
    expect(itemLinks.length).to.equal(4);
    // test opening a random item
    var index = Math.floor(Math.random() * itemLinks.length);
    itemLinks[index].click(); driver.sleep(1000);

    driver.getAllWindowHandles().then(function(tabs) {
      expect(tabs.length).to.equal(2);

      driver.switchTo().window(tabs[1]);
      driver.getTitle().then(function(title) {
        console.log("\tGoods item: "+title);
      });
      driver.close(); driver.switchTo().window(tabs[0]);
    });
  });
}

