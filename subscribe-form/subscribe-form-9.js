var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
    subscribeForm8 = require('./subscribe-form-8.js');
chai.use(require('chai-as-promised'));
    
exports.availableServices = function(driver, formPosition) {

	// subscribe to Insidehook and go to member services
	subscribeForm8.memberServices(driver, formPosition);

	// elements
  var editionsTab = driver.findElement(webdriver.By.linkText("Add Editions"));
	var unsubTab = driver.findElement(webdriver.By.linkText("Unsubscribe"));
	var inviteTab = driver.findElement(webdriver.By.linkText("Invite Friends"));
	var editionsPanel = driver.findElement(webdriver.By.css("#panelEditions"));
	var unsubPanel = driver.findElement(webdriver.By.css("#panelUnsub"));
	var invitePanel = driver.findElement(webdriver.By.css("#panelInvite"));
	var serviceElements = [editionsTab, unsubTab, inviteTab];

	// check panel's visibility, only one should be appear at a time
	// edition should be the default panel
	expect(editionsPanel.isDisplayed()).to.eventually.equal(true);
	expect(unsubPanel.isDisplayed()).to.eventually.equal(false);
	expect(invitePanel.isDisplayed()).to.eventually.equal(false);

	return serviceElements;
}
