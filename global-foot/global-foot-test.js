//  Import Modules
var webdriver = require('selenium-webdriver'),
    webdriverSetup = require('../webdriver-setup.js'),
    generalSetup = require('../general-setup.js'),
    test = require('selenium-webdriver/testing'),
    driver;

//  Import Files
    globalFoot1 = require('./global-foot-1.js'),
    globalFoot2 = require('./global-foot-2.js'),
    globalFoot3 = require('./global-foot-3.js'),
    globalFoot4 = require('./global-foot-4.js'),
    globalFoot5 = require('./global-foot-5.js');
    

test.before(function() {
  this.timeout(generalSetup.buildDriverTimeout());
  driver = webdriverSetup.loadDriver();
  driver.getWindowHandle();
});


test.after(function() {
  driver.quit();
});


test.describe('Global Footer', function() {
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
  test.it('InsideHook elsewhere', function() {
    globalFoot1.elsewhere(driver);
  });
  test.it('the Basics', function() {
    globalFoot2.theBasics(driver);
  });
  test.it('collections', function() {
    globalFoot3.collections(driver);
  });
  test.it('InsideHook essentials', function() {
    globalFoot4.essentials(driver);
  });
  test.it('footer bottom', function() {
    globalFoot5.footerBottom(driver);
  });

});
