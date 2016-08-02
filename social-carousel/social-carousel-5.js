var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    socialCarousel1 = require('./social-carousel-1.js');
chai.use(require('chai-as-promised'));
    
exports.carouselItemsClick = function(driver) {

	// wait for Insidehook on Social section to appear
  var socialSection = socialCarousel1.appear(driver);
  var activeSlickItems = socialSection.findElements(webdriver.By.css(".slick-track .feed-item.allow-overlay.left.slick-slide.slick-active a"));

  activeSlickItems.then(function(items) {
    // expect 4 items appear at maximum window size
    expect(items.length).to.equal(4);

    // test opening a random item
    var testItem = Math.floor(Math.random() * items.length);
    items[testItem].getAttribute('href').then(function(linkUrl) {
      items[testItem].click(); driver.sleep(1000);
      
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
