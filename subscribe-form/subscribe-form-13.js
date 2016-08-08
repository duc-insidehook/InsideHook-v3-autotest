/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    testEmail = 'test@insidehook.com';
chai.use(require('chai-as-promised'));

// Prerequisite Test
var	subscribeForm9 = require('./subscribe-form-9.js');


/**
 *  "not you?"" allows switching user
 *	- subscribe to Insidehook and go to member services
 *	- click on "not you?" and expect a sign in modal
 *	- log in with a different email
 */
exports.notYou = function(driver, formPosition) {

	// subscribe to Insidehook and go to member services
	subscribeForm9.availableServices(driver, formPosition);
	
	// click on "not you?" and expect a sign in modal
	var notYou = driver.findElement(webdriver.By.linkText("not you?"));
	var modalMember = driver.findElement(webdriver.By.css("#modal-member"));

	notYou.click();
	driver.wait(webdriver.until.elementIsVisible(modalMember), 5000);

	// log in with a different email
	var emailInput = modalMember.findElement(webdriver.By.name("email"));
	var logIn = modalMember.findElement(webdriver.By.css(".button.large.expand"));

	emailInput.sendKeys(testEmail);
	logIn.submit();
	driver.wait(webdriver.until.stalenessOf(logIn), 5000);

	var displayedEmail = driver.findElement(webdriver.By.css(".email-html"));
	expect(displayedEmail.getText()).to.eventually.equal(testEmail);

}
