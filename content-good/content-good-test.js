//  Import Modules
var webdriver = require('selenium-webdriver'),
    webdriverSetup = require('../webdriver-setup.js'),
    generalSetup = require('../general-setup.js'),
    test = require('selenium-webdriver/testing'),
    driver;

//  Import Files
var contentGood1 = require('./content-good-1.js'),
    contentGood2 = require('./content-good-2.js'),
    contentGood3 = require('./content-good-3.js'),
    contentGood4 = require('./content-good-4.js'),
    contentGood5 = require('./content-good-5.js');


test.before(function() {
  this.timeout(generalSetup.buildDriverTimeout());
  driver = webdriverSetup.loadDriver();
  driver.getWindowHandle();
});


test.after(function() {
  driver.quit();
});

test.describe('Content Good', function() {
  this.timeout(generalSetup.individualTestTimeout());

  test.beforeEach(function() {
    this.timeout(generalSetup.loadTemplateTimeout());
    driver.get(webdriverSetup.template());
    driver.manage().window().maximize();
  });

  // Test Cases
  test.it('good items correctly display', function() {
    contentGood1.twelveGoods(driver);
  });
  test.it('good items have front and back panels that can be toggled', function() {
    contentGood2.togglePannel(driver);
  }); 
  test.it('good items click to appropriate destination', function() {
    contentGood3.clickgoodItems(driver);
  });
  test.it('clicking More From InsideHook button loads 6 more items for the selected tab', function() {
    contentGood4.clickMore(driver);
  });
  test.it('"More from InsideHook" becomes "This Is The End" when no more items exist', function() {
    contentGood5.noMore(driver);
  });
  
});

