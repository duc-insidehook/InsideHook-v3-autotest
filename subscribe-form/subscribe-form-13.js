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
}
