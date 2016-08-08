/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;    
chai.use(require('chai-as-promised'));
    
// Prerequisite Test
var	subscribeForm1 = require('./subscribe-form-1');


/**
 *  Subsribe form has a sign up form with a <h3> description, email input, zipcode input, 
 *	 a Terms & Conditions checkbox (checked by default), and a submit button
 *	- check form elements' visibility
 *	- check form elements' type
 */
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

	// check form elements' visibility
	expect(description.isDisplayed(), "no description").
		to.eventually.equal(true);
	expect(emailInput.isDisplayed(), "no email input").
		to.eventually.equal(true);
	expect(joinButton.isDisplayed(), "no join button").
		to.eventually.equal(true);
	expect(termsAndCons.isDisplayed(), "no terms and conditions").
		to.eventually.equal(true);
	expect(termsAndCons.isSelected(), "terms and conditions not checked by default").
		to.eventually.equal(true);
	if (formPosition == 'top' || formPosition == 'bot')
		expect(zipInput.isDisplayed(), "no zip code input").
		to.eventually.equal(true);

	// check form elements' types
	expect(emailInput.getTagName()).to.eventually.equal('input');
	expect(joinButton.getTagName()).to.eventually.equal('button');
	expect(termsAndCons.getTagName()).to.eventually.equal('input');
	if (formPosition == 'top' || formPosition == 'bot')
		expect(zipInput.getTagName()).to.eventually.equal('input');

	return formElements;

}
