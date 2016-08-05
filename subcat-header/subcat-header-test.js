/**
 *  Import Modules and Files
 */
var webdriver = require('selenium-webdriver'),
    webdriverSetup = require('../webdriver-setup.js'),
    generalSetup = require('../general-setup.js'),
    test = require('selenium-webdriver/testing'),
    subcatHeader1 = require('./subcat-header-1.js'),
    subcatHeader2 = require('./subcat-header-2.js'),
    driver;


test.before(function() {
  this.timeout(generalSetup.buildDriverTimeout());
  driver = webdriverSetup.loadDriver();
  driver.getWindowHandle();
});


test.after(function() {
  driver.quit();
});


test.describe('Content Feed', function() {
  this.timeout(generalSetup.individualTestTimeout());

  test.beforeEach(function() {
    this.timeout(generalSetup.loadTemplateTimeout());
    driver.get(webdriverSetup.template());
    driver.manage().window().maximize();
  });

  // Test Cases
  test.it('section has one h1 header and sub-categories', function() {
    subcatHeader1.appear(driver);
  });
  test.it('click through to appropriate destination', function() {
    subcatHeader2.clickThrough(driver);
  });
  
});

