var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    testEmail = 'test@insidehook.com',
    subscribeForm9 = require('./subscribe-form-9.js');
chai.use(require('chai-as-promised'));
    
exports.notYou = function(driver, formPosition) {

	// subscribe to Insidehook and go to member services
	subscribeForm9.availableServices(driver, formPosition);
	
	var notYou = driver.findElement(webdriver.By.linkText("not you?"));
	var modalMember = driver.findElement(webdriver.By.css("#modal-member"));

	notYou.click();
	driver.wait(webdriver.until.elementIsVisible(modalMember), 5000);

	var emailInput = modalMember.findElement(webdriver.By.name("email"));
	var logIn = modalMember.findElement(webdriver.By.css(".button.large.expand"));

	emailInput.sendKeys(testEmail);
	logIn.submit();
	driver.wait(webdriver.until.stalenessOf(logIn), 5000);

	var displayedEmail = driver.findElement(webdriver.By.css(".email-html"));
	expect(displayedEmail.getText()).to.eventually.equal(testEmail);

}
