var webdriver = require('selenium-webdriver'),
    webdriverSetup = require('../webdriver-setup.js'),
    generalSetup = require('../general-setup.js'),
    test = require('selenium-webdriver/testing'),
    ads1 = require('./home-ads-1.js'),
    ads2 = require('./home-ads-2.js'),
    ads3 = require('./home-ads-3.js'),
    ads4 = require('./home-ads-4.js'),
    driver;

test.before(function() {
  this.timeout(generalSetup.buildDriverTimeout());
  driver = webdriverSetup.localDriver();
  driver.getWindowHandle();
});

test.after(function() {
  driver.quit();
});


test.describe('Home Ads', function() {
  this.timeout(generalSetup.individualTestTimeout());

  test.beforeEach(function() {
    this.timeout(generalSetup.loadTemplateTimeout());
    driver.get(webdriverSetup.template());
    driver.sleep(generalSetup.pageLoadTime());
    driver.manage().window().maximize();
  });

  test.it('728x90 appears below small carousel', function() {
    ads1.bottomAdsAppear(driver);
  });
  test.it('728x90 clicks through to approrpiate destination', function() {
    ads2.bottomAdsClick(driver);
  });
  test.it('300x600 appears in right rail next to content feed', function() {
    ads3.railAdsAppear(driver);
  });
  test.it('300x600 clicks through to appropriate destination', function() {
    ads4.railAdsClick(driver);
  });

});

