var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    subscribeForm1 = require('./subscribe-form-1');
chai.use(require('chai-as-promised'));
    
exports.displayForm = function(driver, formPosition) {
  
  // open Subscribe Form
 	var signUpForm = subscribeForm1.openForm(driver, formPosition);
 	driver.actions().mouseMove(signUpForm).perform();

  // elements
	var description = signUpForm.findElement(webdriver.By.css("h3"));
	var emailInput = signUpForm.findElement(webdriver.By.name("email"));
	var joinButton = signUpForm.findElement(webdriver.By.tagName("button"));
	var termsAndCons = signUpForm.findElement(webdriver.By.name("terms"));
	var emailError = signUpForm.findElement(webdriver.By.css(".error"));
	var termsError = signUpForm.findElement(webdriver.By.css(".error.below"));
	if (formPosition == 'top' || formPosition == 'bot')
		var zipInput = signUpForm.findElement(webdriver.By.css("#zipField")); 
	else zipInput = null;
	var formElements = [description, emailInput, zipInput, joinButton, 
									termsAndCons, emailError, termsError];

	// check visibilities 
	expect(description.isDisplayed()).to.eventually.equal(true);
	expect(emailInput.isDisplayed()).to.eventually.equal(true);
	expect(joinButton.isDisplayed()).to.eventually.equal(true);
	expect(termsAndCons.isDisplayed()).to.eventually.equal(true);
	expect(termsAndCons.isSelected()).to.eventually.equal(true);
	if (formPosition == 'top' || formPosition == 'bot')
		expect(zipInput.isDisplayed()).to.eventually.equal(true);

	// check types
	expect(emailInput.getTagName()).to.eventually.equal('input');
	expect(joinButton.getTagName()).to.eventually.equal('button');
	expect(termsAndCons.getTagName()).to.eventually.equal('input');
	if (formPosition == 'top' || formPosition == 'bot')
		expect(zipInput.getTagName()).to.eventually.equal('input');

	return formElements;

}
