/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    testEmail = 'valid-email@insidehook.com';
chai.use(require('chai-as-promised'));

// Prerequisite Test
var subscribeForm3 = require('./subscribe-form-3');


/**
 *  Subscribe form validates input and provide feedback
 *	- retrieve form elements
 *	- test with invalid email
 *	- test with valid email, but unchecked terms and conditionns
 */
exports.invalidInput = function(driver, formPosition) {

	// retrieve form elements
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
	emailInput.sendKeys(testEmail);
	termsAndCons.click();
	joinButton.submit();
	driver.wait(webdriver.until.elementIsNotVisible(emailError), 1000);
	driver.wait(webdriver.until.elementIsVisible(termsError), 1000);

}
