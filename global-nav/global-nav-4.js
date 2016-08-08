/**
 *  Import Modules
 */
 var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;


/**
 *  Subscribe hyperlink when not log in
 */
exports.subscribeLink = function(driver) {
  
  var subscribeButton = driver.findElement(webdriver.By.css(".global-navigation.top-bar .border.subscribe"));
  subscribeButton.getText().then(function(buttonStatus) {
    expect(buttonStatus).to.equal('SUBSCRIBE');
  });

}