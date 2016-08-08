/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver');

// Prerequisite Test
var subscribeForm5 = require('./subscribe-form-5.js');

/**
 *  Once subscribed, subscribe hyperlink becomes member services
 *	- subscribe to Insidehook with valid email
 *	- close thxForm and expect member services button
 */
exports.memberServices = function(driver, formPosition) {

	// subscribe to Insidehook with valid email
	var thxForm = subscribeForm5.validInput(driver, formPosition);

	// close thxForm and expect member services button
	var closeButton = thxForm.findElement(webdriver.By.css(".close-reveal-modal"));
	closeButton.click();
	driver.wait(webdriver.until.elementIsNotVisible(thxForm), 5000);

  var memberButton = driver.findElement(webdriver.By.linkText("MEMBER SERVICES"));
  memberButton.click();
  driver.wait(webdriver.until.stalenessOf(memberButton), 5000);

  driver.sleep(2000);
}
