var webdriver = require('selenium-webdriver'),
    webdriverSetup = require('../webdriver-setup.js'),
    rawTemplate = webdriverSetup.rawTemplate(),
    generalSetup = require('../general-setup.js'),
    test = require('selenium-webdriver/testing'),
    socialCarousel1 = require('./social-carousel-1.js'),
    socialCarousel2 = require('./social-carousel-2.js'),
    socialCarousel3 = require('./social-carousel-3.js'),
    socialCarousel4 = require('./social-carousel-4.js'),
    socialCarousel5 = require('./social-carousel-5.js'),
    socialCarousel6 = require('./social-carousel-6.js'),
    driver;

test.before(function() {
  this.timeout(generalSetup.buildDriverTimeout());
  driver = webdriverSetup.localDriver();
  driver.getWindowHandle();
});

test.after(function() {
  driver.quit();
});

test.describe('Social Carousel', function() {
  this.timeout(generalSetup.individualTestTimeout());

  test.beforeEach(function() {
    this.timeout(generalSetup.loadTemplateTimeout());
    driver.get(webdriverSetup.template());
    driver.sleep(generalSetup.pageLoadTime());
    driver.manage().window().maximize();
  });
  
  
  test.it('small carousel appears as expected', function() {
    socialCarousel1.appear(driver);
  }); 
  test.it('social icons click through to appropriate destination', function() {
    socialCarousel2.socialIcons(driver, rawTemplate);
  }); 
  test.it('display correct items', function() {
    socialCarousel3.carouselItemsDisplay(driver, rawTemplate);
  }); 
  test.it('300x300 for each item, goods item have description panel', function() {
    socialCarousel4.itemsFeature(driver, rawTemplate);
  });
  test.it('items click through to appropriate destination', function() {
    socialCarousel5.carouselItemsClick(driver, rawTemplate);
  });
  test.it('click and drag to advance the slide', function() {
    socialCarousel6.clickAndDrag(driver);
  });
  
});

