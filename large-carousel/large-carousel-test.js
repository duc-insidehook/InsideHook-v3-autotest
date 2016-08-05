/**
 *  Import Modules and Files
 */
var webdriver = require('selenium-webdriver'),
    webdriverSetup = require('../webdriver-setup.js'),
    generalSetup = require('../general-setup.js'),
    test = require('selenium-webdriver/testing'),
    largeCarousel1 = require('./large-carousel-1.js'),
    largeCarousel2 = require('./large-carousel-2.js'),
    largeCarousel3 = require('./large-carousel-3.js'),
    largeCarousel4 = require('./large-carousel-4.js'),
    largeCarousel5 = require('./large-carousel-5.js'),
    driver;


test.before(function() {
  this.timeout(generalSetup.buildDriverTimeout());
  driver = webdriverSetup.loadDriver();
  driver.getWindowHandle();
});


test.after(function() {
  driver.quit();
});


test.describe('Large Carousel', function() {
  this.timeout(generalSetup.individualTestTimeout());

  test.beforeEach(function() {
    this.timeout(generalSetup.loadTemplateTimeout());
    driver.get(webdriverSetup.template());
    driver.sleep(generalSetup.pageLoadTime());
    driver.manage().window().maximize();
  });
  
  // Test Cases
  test.it('carousel auto advances', function() {
    largeCarousel1.autoAdvance(driver);
  });
  test.it('image and title block click through to appropriate destination', function() {
    largeCarousel2.imageAndTitle(driver);
  });
  test.it('click and drag to advance the slide', function() {
    largeCarousel3.clickAndDrag(driver);
  });
  test.it('click the coins to advance the slide', function() {
    largeCarousel4.slickCoins(driver);
  });
  test.it('click the arrows to advance the slide', function() {
    largeCarousel5.slickArrows(driver);
  });
  
});

