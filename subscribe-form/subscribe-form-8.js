var webdriver = require('selenium-webdriver'),
    subscribeForm5 = require('./subscribe-form-5.js');
    
exports.memberServices = function(driver, formPosition) {

	// subscribe to Insidehook with valid email
	var thxForm = subscribeForm5.validInput(driver, formPosition);

	var closeButton = thxForm.findElement(webdriver.By.css(".close-reveal-modal"));
	closeButton.click();
	driver.wait(webdriver.until.elementIsNotVisible(thxForm), 5000);

  var memberButton = driver.findElement(webdriver.By.linkText("MEMBER SERVICES"));
  memberButton.click();
  driver.wait(webdriver.until.stalenessOf(memberButton), 5000);

  driver.sleep(2000);
}
