var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
    subscribeForm9 = require('./subscribe-form-9.js');
chai.use(require('chai-as-promised'));
    
exports.unsubPanel = function(driver, formPosition) {

	// subscribe to Insidehook and go to member services
	var serviceElements = subscribeForm9.availableServices(driver, formPosition);
	// [editionsTab, unsubTab, inviteTab]

	// elements
	var unsubTab = serviceElements[1];
	var nationEdition = driver.findElement(webdriver.By.css("#unsubs-1"));
	var nyEdition = driver.findElement(webdriver.By.css("#unsubs-2"));
	var laEdition = driver.findElement(webdriver.By.css("#unsubs-3"));
	var sanFranEdition = driver.findElement(webdriver.By.css("#unsubs-4"));
	var chicagoEdition = driver.findElement(webdriver.By.css("#unsubs-5"));
	var unsubsUpdate = driver.findElement(webdriver.By.css("#editionUnsubForm button"));


	// unsubscribe to San Francisco and Chicago editions
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
	
	// expect sanFrancisco and Chicago edigtions to disappear in unsub panel
	unsubTab.click();
	driver.wait(webdriver.until.elementIsVisible(unsubsUpdate), 5000);

	sanFranEdition.isDisplayed().then(function(sanFranIsVisible){
		expect(sanFranIsVisible).to.equal(false);
	});
	chicagoEdition.isDisplayed().then(function(chicagoIsVisible){
		expect(chicagoIsVisible).to.equal(false);
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

	// wait until unmember modal appears
	driver.wait(webdriver.until.elementLocated(webdriver.By.css("#modal-unmember")), 5000);
	
	// expect unmember modal to disappear after a short time
	var modalUnmember = driver.findElement(webdriver.By.css("#modal-unmember"));
	driver.wait(webdriver.until.stalenessOf(modalUnmember), 10000);

	// expect home page is opened
	expect(driver.getCurrentUrl()).to.eventually.equal("http://www-stage.insidehook.com/");

}
