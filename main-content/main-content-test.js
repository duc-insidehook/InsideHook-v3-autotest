//  Import Modules
var webdriver = require('selenium-webdriver'),
    webdriverSetup = require('../webdriver-setup.js'),
    generalSetup = require('../general-setup.js'),
    test = require('selenium-webdriver/testing'),
    driver;

//  Import Files
var mainContent1 = require('./main-content-1.js'),
    mainContent2 = require('./main-content-2.js'),
    mainContent3 = require('./main-content-3.js'),
    mainContent4 = require('./main-content-4.js'),
    mainContent5 = require('./main-content-5.js');


test.before(function() {
  this.timeout(generalSetup.buildDriverTimeout());
  driver = webdriverSetup.loadDriver();
  driver.getWindowHandle();
});


test.after(function() {
  driver.quit();
});


test.describe('Main Content', function() {
  this.timeout(generalSetup.individualTestTimeout());

  test.beforeEach(function() {
    this.timeout(generalSetup.loadTemplateTimeout());
    driver.get(webdriverSetup.template());
    driver.sleep(generalSetup.pageLoadTime());
    driver.manage().window().maximize();
  });
  
  // Test Cases
  test.it('header and social icons appear as expected', function() {
    mainContent1.headerAndSocial(driver);
  });
  test.it('image and article body appear as expected', function() {
    mainContent2.imageAndBody(driver);
  });
  test.it('tags click through to appropriate destination', function() {
    mainContent3.tags(driver);
  });
  test.it('zergnet articles click through to appropriate destination', function() {
    mainContent4.znet(driver);
  });
  test.it('social icons click through to appropriate destination', function() {
    mainContent5.socialIcons(driver);
  });

});

