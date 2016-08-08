//  Import Modules
 var webdriver = require('selenium-webdriver'),
    webdriverSetup = require('../webdriver-setup.js'),
    generalSetup = require('../general-setup.js'),
    test = require('selenium-webdriver/testing'),
    driver;

//  Import Files
var trendingTags1 = require('./trending-tags-1.js'),
    trendingTags2 = require('./trending-tags-2.js');


test.before(function() {
  this.timeout(generalSetup.buildDriverTimeout());
  driver = webdriverSetup.loadDriver();
  driver.getWindowHandle();
});


test.after(function() {
  driver.quit();
});


test.describe('Trending Tags', function() {
  this.timeout(generalSetup.individualTestTimeout());

  test.beforeEach(function() {
    this.timeout(generalSetup.loadTemplateTimeout());
    driver.get(webdriverSetup.template());
    driver.sleep(generalSetup.pageLoadTime())
    driver.manage().window().maximize();
  });

  // Test Cases
  test.it('four trending tags display', function() {
    trendingTags1.tagsDisplay(driver);
  });
  test.it('trending tags click through to appropriate distination', function() {
    trendingTags2.tagsClick(driver);
  });

});

