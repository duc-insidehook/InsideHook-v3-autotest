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
 *  Unsubscribe panel behaves as expected
 *	- subscribe to Insidehook and go to member services
 *	- locate all editions in unsub panel
 *	- unsubscribe to sanFran and Chicago editions
 *	- expect sanFran and Chicago editions to disappear in unsub panel
 *	- unsubscribe to the remaining editions
 *	- expect unmember modal to pop up and disappear after a short time, then homepage is opened
 */
exports.unsubPanel = function(driver, formPosition) {

	// subscribe to Insidehook and go to member services
	var serviceElements = subscribeForm9.availableServices(driver, formPosition);
	// [editionsTab, unsubTab, inviteTab]

	// locate all editions in unsub panel
	var unsubTab = serviceElements[1];
	var nationEdition = driver.findElement(webdriver.By.css("#unsubs-1"));
	var nyEdition = driver.findElement(webdriver.By.css("#unsubs-2"));
	var laEdition = driver.findElement(webdriver.By.css("#unsubs-3"));
	var sanFranEdition = driver.findElement(webdriver.By.css("#unsubs-4"));
	var chicagoEdition = driver.findElement(webdriver.By.css("#unsubs-5"));
	var unsubsUpdate = driver.findElement(webdriver.By.css("#editionUnsubForm button"));

	// unsubscribe to SanFran and Chicago editions
	unsubTab.click();
	driver.wait(webdriver.until.elementIsVisible(unsubsUpdate), 5000);

	sanFranEdition.isDisplayed().then(function(sanFranIsVisible) {
		if( sanFranIsVisible ) {sanFranEdition.click();}
	});
	chicagoEdition.isDisplayed().then(function(chicagoIsVisible) {
		if( chicagoIsVisible ) {chicagoEdition.click();}
	});
	unsubsUpdate.submit();
	driver.wait(webdriver.until.elementIsNotVisible(unsubsUpdate), 5000);
	
	// expect sanFran and Chicago editions to disappear in unsub panel
	unsubTab.click();
	driver.wait(webdriver.until.elementIsVisible(unsubsUpdate), 5000);

	sanFranEdition.isDisplayed().then(function(sanFranIsVisible){
		expect(sanFranIsVisible, "sanFran is still displayed in unsub tab").
			to.equal(false);
	});
	chicagoEdition.isDisplayed().then(function(chicagoIsVisible){
		expect(chicagoIsVisible, "Chicago is still displayed in unsub tab").
			to.equal(false);
	});
	
	// unsubscribe to the remaining editions
	nationEdition.isDisplayed().then(function(nationIsVisible) {
		if( nationIsVisible ) {nationEdition.click();}
	});
	nyEdition.isDisplayed().then(function(nyIsVisible) {
		if( nyIsVisible ) {nyEdition.click();}
	});
	laEdition.isDisplayed().then(function(laIsVisible) {
		if( laIsVisible ) {laEdition.click();}
	});
	unsubsUpdate.submit();

	// expect unmember modal to pop up and disappear after a short time, then homepage is opened
	driver.wait(webdriver.until.elementLocated(webdriver.By.css("#modal-unmember")), 5000);
	var modalUnmember = driver.findElement(webdriver.By.css("#modal-unmember"));
	
	driver.wait(webdriver.until.stalenessOf(modalUnmember), 10000);
	expect(driver.getCurrentUrl(), "homepage is not loaded after unsubscribing to all editions").
		to.eventually.equal("http://www-stage.insidehook.com/");

}
