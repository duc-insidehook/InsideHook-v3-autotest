//  Import Modules
var webdriver = require('selenium-webdriver'),
    webdriverSetup = require('../webdriver-setup.js'),
    generalSetup = require('../general-setup.js'),
    test = require('selenium-webdriver/testing'),
    driver;

//  Import Files
var contentFeed1 = require('./content-feed-1.js'),
    contentFeed2 = require('./content-feed-2.js'),
    contentFeed3 = require('./content-feed-3.js'),
    contentFeed4 = require('./content-feed-4.js'),
    contentFeed5 = require('./content-feed-5.js');


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
  test.it('seven items appear in The Latest', function() {
    contentFeed1.sevenItemsLatest(driver);
  }); 
  test.it('seven items appear in Editor\'s Picks', function() {
    contentFeed2.sevenItemsPicks(driver);
  }); 
  test.it('items click through to appropriate destination', function() {
    contentFeed3.clickContentFeed(driver);
  });
  test.it('clicking More From InsideHook button loads 6 more items for the selected tab', function() {
    contentFeed4.clickMore(driver);
  }); 
  test.it('"More from InsideHook" becomes "This Is The End" when no more items exist', function() {
    contentFeed5.noMore(driver);
  });
  
});

