var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
    subscribeForm9 = require('./subscribe-form-9.js');
chai.use(require('chai-as-promised'));
    
exports.editionsPanel = function(driver, formPosition) {

	// subscribe to Insidehook and go to member services
	var serviceElements = subscribeForm9.availableServices(driver, formPosition);
	// [editionsTab, unsubTab, inviteTab]

	// elements
  var editionsTab = serviceElements[0];
	var nationEdition = driver.findElement(webdriver.By.css("#subs-1"));
	var nyEdition = driver.findElement(webdriver.By.css("#subs-2"));
	var laEdition = driver.findElement(webdriver.By.css("#subs-3"));
	var sanFranEdition = driver.findElement(webdriver.By.css("#subs-4"));
	var chicagoEdition = driver.findElement(webdriver.By.css("#subs-5"));
	var editionsUpdate = driver.findElement(webdriver.By.css("#editionSignupForm  button"));
	var editionsAll = driver.findElement(webdriver.By.css("#editionsAll"));

	// update button will not proceed without selecting an edtion-checkbox
	editionsUpdate.isDisplayed().then(function(updateAvailable) {
		if( updateAvailable ) {
			editionsUpdate.submit();
			driver.wait(webdriver.until.elementIsVisible(editionsTab), 5000);
		}
	});
	
	// subscribe to remaining editions
	nationEdition.isDisplayed().then(function(visible){
		if( visible ) {nationEdition.click();}
	});
	nyEdition.isDisplayed().then(function(visible){
		if( visible ) {nyEdition.click();}
	});
	laEdition.isDisplayed().then(function(visible){
		if( visible ) {laEdition.click();}
	});
	sanFranEdition.isDisplayed().then(function(visible){
		if( visible ) {sanFranEdition.click();}
	});
	chicagoEdition.isDisplayed().then(function(visible){
		if( visible ) {chicagoEdition.click();}
	});

	// when all 5 editions are added, a new form is displayed
	editionsUpdate.submit();
	driver.wait(webdriver.until.elementIsNotVisible(editionsUpdate), 5000);

	editionsTab.click();
	driver.wait(webdriver.until.elementIsVisible(editionsAll), 5000);

}
