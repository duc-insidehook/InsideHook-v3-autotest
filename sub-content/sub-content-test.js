var webdriver = require('selenium-webdriver'),
    webdriverSetup = require('../webdriver-setup.js'),
    generalSetup = require('../general-setup.js'),
    test = require('selenium-webdriver/testing'),
    subContent1 = require('./sub-content-1.js'),
    subContent2 = require('./sub-content-2.js'),
    subContent3 = require('./sub-content-3.js'),
    subContent4 = require('./sub-content-4.js'),
    subContent5 = require('./sub-content-5.js'),
    subContent6 = require('./sub-content-6.js'),
    subContent7 = require('./sub-content-7.js'),
    subContent8 = require('./sub-content-8.js'),
    driver;

test.before(function() {
  this.timeout(generalSetup.buildDriverTimeout());
  driver = webdriverSetup.localDriver();
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
    // driver.sleep(generalSetup.pageLoadTime());
    driver.manage().window().maximize();
  });

  
  test.it('five items appear in The Latest', function() {
    subContent1.fiveItemsLatest(driver);
  }); 
  test.it('five items appear in Editor\'s Picks', function() {
    subContent2.fiveItemsPicks(driver);
  }); 
  test.it('items click through to appropriate destination', function() {
    subContent3.clickContentFeed(driver);
  });
  test.it('more articles appear with h3 header', function() {
    subContent4.moreArticles(driver);
  });
  test.it('featured article clicks through to appropriate destination', function() {
    subContent5.clickFeatured(driver);
  });
  test.it('more articles click through to appropriate destination', function() {
    subContent6.clickArticles(driver);
  });
  test.it('clicking More From InsideHook button loads 6 more items for the selected tab', function() {
    subContent7.clickMore(driver);
  }); 
  test.it('"More from InsideHook" becomes "This Is The End" when no more items exist', function() {
    subContent8.noMore(driver);
  });
  
});

