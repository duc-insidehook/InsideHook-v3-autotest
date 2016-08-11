/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));

// Prerequisite Test
subscribeForm1 = require('./subscribe-form-1.js');


/**
 *  Top subscribe form has a X close
 */
exports.closeForm = function(driver, formPosition) {

	if (formPosition == 'top') {
		// open Subscribe Form
		var signUpForm = subscribeForm1.openForm(driver, formPosition);

		var closeButton = signUpForm.findElement(webdriver.By.css(".close-reveal-modal"));
		closeButton.click();
		driver.wait(webdriver.until.elementIsNotVisible(signUpForm), 5000);
	}

	else console.log('\t- the test bellow is not applicable on this template');

}
