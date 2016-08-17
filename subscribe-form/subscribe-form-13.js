/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));

// Prerequisite Test
var	subscribeForm9 = require('./subscribe-form-9.js');


/**
 *  "not you?"" allows switching user
 *	- subscribe to Insidehook and go to member services
 *	- click on "not you?" and expect a sign in modal
 *	- log in with a not-yet-subscribed-email and expect error
 *	- click "join now" and expect sign up modal
 *	- close sign up modal
 *	- click not you again, and enter an already-subscribed-email
 *	- expect change in current logging in email
 */
exports.notYou = function(driver, formPosition) {

	// subscribe to Insidehook and go to member services
	subscribeForm9.availableServices(driver, formPosition);
	
	// click on "not you?" and expect a sign in modal
	var notYou = driver.findElement(webdriver.By.linkText("not you?"));
	var modalMember = driver.findElement(webdriver.By.css("#modal-member"));
	var modalSignUp = driver.findElement(webdriver.By.css("#modal-sign-up"));

	notYou.click();
	driver.wait(webdriver.until.elementIsVisible(modalMember), 5000);

	var emailInput = modalMember.findElement(webdriver.By.name("email"));
	var logIn = modalMember.findElement(webdriver.By.css(".button.large.expand"));
	var memberError = modalMember.findElement(webdriver.By.css(".error"));
	var joinNow = modalMember.findElement(webdriver.By.linkText("Join Now"));

	// log in with a not-yet-subscribed-email and expect error
	emailInput.sendKeys('not-yet-a-member@insidehook.com');
	logIn.submit();
	driver.wait(webdriver.until.elementIsVisible(memberError), 5000);
	driver.sleep(1000);
	
	// click "join now" and expect sign up modal
	joinNow.click();
	driver.wait(webdriver.until.elementIsVisible(modalSignUp), 5000);
	driver.sleep(1000);
	
	// close sign up modal
	var closeForm = modalSignUp.findElement(webdriver.By.css(".close-reveal-modal"));
	closeForm.click();
	driver.wait(webdriver.until.elementIsNotVisible(modalSignUp), 5000);
	driver.sleep(1000);

	// click not you again, and enter an already-subscribed-email
	notYou.click();
	driver.wait(webdriver.until.elementIsVisible(modalMember), 5000);
	emailInput.clear();
	emailInput.sendKeys('dngo@insidehook.com');
	logIn.submit();
	driver.wait(webdriver.until.stalenessOf(logIn), 5000);

 	// expect change in current logging in email
 	var userEmail = driver.findElement(webdriver.By.css(".email-html"));
 	expect(userEmail.getText(), "cannot log in with a different email").
 		to.eventually.equal('dngo@insidehook.com');
}
