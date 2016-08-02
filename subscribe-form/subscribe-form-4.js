var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    subscribeForm3 = require('./subscribe-form-3');
chai.use(require('chai-as-promised'));
    
exports.invalidInput = function(driver, formPosition) {

	// open Subscribe Form and get form elements
	var formElements = subscribeForm3.displayForm(driver, formPosition);
	// [description, emailInput, zipInput, joinButton, termsAndCons, emailError, termsError]
	var emailInput = formElements[1];
	var joinButton = formElements[3];
	var termsAndCons = formElements[4];
	var emailError = formElements[5];
	var termsError = formElements[6];
	
	// test with invalid email
	emailInput.sendKeys("this-is-not-a-valid-email-address");
	joinButton.submit();
	driver.wait(webdriver.until.elementIsVisible(emailError), 1000);

	// test with valid email, but unchecked terms and conditionns
	emailInput.clear();
	emailInput.sendKeys("valid-email@insidehook.com");
	termsAndCons.click();
	joinButton.submit();
	driver.wait(webdriver.until.elementIsNotVisible(emailError), 1000);
	driver.wait(webdriver.until.elementIsVisible(termsError), 1000);

}
