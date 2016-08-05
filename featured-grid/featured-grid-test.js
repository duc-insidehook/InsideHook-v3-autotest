/**
 *  Import Modules and Files
 */
var webdriver = require('selenium-webdriver'),
    webdriverSetup = require('../webdriver-setup.js'),
    rawTemplate = webdriverSetup.rawTemplate(),
    generalSetup = require('../general-setup.js'),
    test = require('selenium-webdriver/testing'),
    featuredGrid1 = require('./featured-grid-1.js'),
    featuredGrid2 = require('./featured-grid-2.js'),
    featuredGrid3 = require('./featured-grid-3.js'),
    featuredGrid4 = require('./featured-grid-4.js'),
    featuredGrid5 = require('./featured-grid-5.js'),
    driver;


test.before(function() {
  this.timeout(generalSetup.buildDriverTimeout());
  driver = webdriverSetup.loadDriver();
  driver.getWindowHandle();
});


test.after(function() {
  driver.quit();
});


test.describe('Featured Grid', function() {
  this.timeout(generalSetup.individualTestTimeout());

  test.beforeEach(function() {
    this.timeout(generalSetup.loadTemplateTimeout());
    driver.get(webdriverSetup.template());
    driver.manage().window().maximize();
  });
  
  // Test Cases
  test.xit('featured items get a blue opaque overlay on hover', function() {
    featuredGrid1.opaqueOnHover(driver, rawTemplate);
  });
  test.it('featured items clicks through to appropriate destination', function() {
    featuredGrid2.featuredItemClick(driver, rawTemplate);
  });
  test.it('three grid items appear as expected', function() {
    featuredGrid3.gridItemDisplay(driver);
  });
  test.it('grid items click through to appropriate destination', function() {
    featuredGrid4.gridItemClick(driver);
  });
  test.it('300x250 ad appears', function() {
    featuredGrid5.ad(driver);
  });

});

