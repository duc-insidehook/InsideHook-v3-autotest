var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    subscribeForm1 = require('./subscribe-form-1.js');
chai.use(require('chai-as-promised'));

exports.closeForm = function(driver, formPosition) {

	if (formPosition == 'top') {
		// open Subscribe Form
		var signUpForm = subscribeForm1.openForm(driver, formPosition);
		var closeButton = signUpForm.findElement(webdriver.By.css(".close-reveal-modal"));
		
		closeButton.click();
		driver.wait(webdriver.until.elementIsNotVisible(signUpForm), 5000);
	}

}
