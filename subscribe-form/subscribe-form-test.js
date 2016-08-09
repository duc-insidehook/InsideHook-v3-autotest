//  Import Modules
var webdriver = require('selenium-webdriver'),
    webdriverSetup = require('../webdriver-setup.js'),
    generalSetup = require('../general-setup.js'),
    test = require('selenium-webdriver/testing'),
    driver;
    
//  Import Files
var subscribeForm1 = require('./subscribe-form-1.js'),
    subscribeForm2 = require('./subscribe-form-2.js'),
    subscribeForm3 = require('./subscribe-form-3.js'),
    subscribeForm4 = require('./subscribe-form-4.js'),
    subscribeForm5 = require('./subscribe-form-5.js'),
    subscribeForm6 = require('./subscribe-form-6.js'),
    subscribeForm7 = require('./subscribe-form-7.js'),
    subscribeForm8 = require('./subscribe-form-8.js'),
    subscribeForm9 = require('./subscribe-form-9.js'),
    subscribeForm10 = require('./subscribe-form-10.js'),
    subscribeForm11 = require('./subscribe-form-11.js'),
    subscribeForm12 = require('./subscribe-form-12.js'),
    subscribeForm13 = require('./subscribe-form-13.js');
    
/**
 *  choose form position to test
 *  'top' - subscribe button on global-nav bar
 *  'right' - subscribe form on the right rail
 *  'bot' - subscribe form on the bottom footer
 */
var formPosition = 'top';


test.before(function() {
  this.timeout(generalSetup.buildDriverTimeout());
  driver = webdriverSetup.loadDriver();
  driver.getWindowHandle();
});


test.after(function() {
  driver.quit();
});


test.describe('Subscribe Form', function() {
  this.timeout(generalSetup.individualTestTimeout());

  test.beforeEach(function() {
    this.timeout(generalSetup.loadTemplateTimeout());
    driver.get(webdriverSetup.template());
    driver.sleep(generalSetup.pageLoadTime());
    driver.manage().window().maximize();
  });

  test.afterEach(function() {
    driver.manage().deleteAllCookies();
  });

  // Test Cases
  test.it('subscribe form pops up after clicking subscribe hyperlink', function() {
    subscribeForm1.openForm(driver, formPosition);
  });
  test.it('top subscribe form has a \'X\' close', function() {
    subscribeForm2.closeForm(driver, formPosition);
  }); 
  test.it('subsribe form has a sign up form with a <h3> description, email input, zipcode input, a Terms & Conditions checkbox (checked by default), and a submit button', function() {
    subscribeForm3.displayForm(driver, formPosition);
  });
  test.it('subscribe form validates input and provide feedback', function() {
    subscribeForm4.invalidInput(driver, formPosition);
  });
  test.it('subscribe form proceeds to become thank you form when submit valid data', function() {
    subscribeForm5.validInput(driver, formPosition);
  });
  test.it('user\'s email appears in cookies', function() {
    subscribeForm6.cookies(driver, formPosition);
  });   
  test.it('thank you form notifies the user about the subscribed edition, and contains checkboxes for more editions', function() {
    subscribeForm7.thxForm(driver, formPosition);
  });
  test.it('once subscribed, subscribe hyperlink becomes member services', function() {
    subscribeForm8.memberServices(driver, formPosition);
  }); 
  test.it('member sercives include Add Editions, Unsubscribe, and Invite Friends', function() {
    subscribeForm9.availableServices(driver, formPosition);
  }); 
  test.it('add editions panel behaves as expected', function() {
    subscribeForm10.editionsPanel(driver, formPosition);
  }); 
  test.it('unsubscribe panel behaves as expected', function() {
    subscribeForm11.unsubPanel(driver, formPosition);
  });
  test.it('invite friends panel behaves as expected', function() {
    subscribeForm12.invitePanel(driver, formPosition);
  });
  test.it('\'not you?\' allows switching user', function() {
    subscribeForm13.notYou(driver, formPosition);
  });
  
});

