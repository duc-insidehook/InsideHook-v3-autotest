/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;

// Prerequisite Test
var	subscribeForm5 = require('./subscribe-form-5.js');
    

/**
 *  User's email appears in cookies
 *	- subscribe to Insidehook with valid email
 *	- check cookies
 */
exports.cookies = function(driver, formPosition) {

	// subscribe to Insidehook with valid email
	subscribeForm5.validInput(driver, formPosition);

	// check cookies
  var cookies = driver.manage().getCookie('email', {domain:'.insidehook.com'});
	cookies.then(function(email) {
		expect(email['value']).to.equal("valid-email%40insidehook.com");
	});

}
