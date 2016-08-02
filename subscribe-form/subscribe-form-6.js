var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    subscribeForm5 = require('./subscribe-form-5.js');
    
exports.cookies = function(driver, formPosition) {

	// subscribe to Insidehook with valid email
	subscribeForm5.validInput(driver, formPosition);

  var cookies = driver.manage().getCookie('email', {domain:'.insidehook.com'});
	cookies.then(function(email) {
		expect(email['value']).to.equal("valid-email%40insidehook.com");
	});

}
