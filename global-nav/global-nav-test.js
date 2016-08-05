/**
 *  Import Modules and Files
 */
var webdriver = require('selenium-webdriver'),
    webdriverSetup = require('../webdriver-setup.js'),
    generalSetup = require('../general-setup.js'),
    test = require('selenium-webdriver/testing'),
    globalNav1 = require('./global-nav-1.js'),
    globalNav2 = require('./global-nav-2.js'),
    globalNav3 = require('./global-nav-3.js'),
    globalNav4 = require('./global-nav-4.js'),
    globalNav5 = require('./global-nav-5.js'),
    globalNav6 = require('./global-nav-6.js'),
    driver;


test.before(function() {
  this.timeout(generalSetup.buildDriverTimeout());
  driver = webdriverSetup.loadDriver();
  driver.getWindowHandle();
});


test.after(function() {
  driver.quit();
});


test.describe('Global Navigation', function() {
  this.timeout(generalSetup.individualTestTimeout());

  test.beforeEach(function() {
    this.timeout(generalSetup.loadTemplateTimeout());
    driver.get(webdriverSetup.template());
    driver.sleep(generalSetup.pageLoadTime());
    driver.manage().window().maximize();
  })

  test.afterEach(function() {
    driver.manage().deleteAllCookies();
  });
  
  // Test Cases  
  test.it('InsideHook logo clicks through to the homepage', function() {
    globalNav1.insidehookLogo(driver);
  });
  test.it('category links click through to appropriate category pages', function() {
    globalNav2.categoryLinks(driver);
  }); 
  test.it('cities drop down on hover and clicks through to appropriate home page', function() {
    globalNav3.citiesLink(driver);
  });
  test.it('subscribe hyperlink when not log in', function() {
    globalNav4.subscribeLink(driver);
  }); 
  test.it('Search magnifying glass toggles search overlay', function() {
    globalNav5.searchGlass(driver);
  });
  test.it('Social icons link to InsideHook\'s social pages', function() {
    globalNav6.socialButtons(driver);
  });

});
