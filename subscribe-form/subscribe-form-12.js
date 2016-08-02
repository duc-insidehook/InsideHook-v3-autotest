var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    subscribeForm9 = require('./subscribe-form-9.js');
chai.use(require('chai-as-promised'));
    
exports.invitePanel = function(driver, formPosition) {

	// subscribe to Insidehook and go to member services
	var serviceElements = subscribeForm9.availableServices(driver, formPosition);
	// [editionsTab, unsubTab, inviteTab]

	// elements
  var inviteTab = serviceElements[2];
	var fbIcon = driver.findElement(webdriver.By.css("#panelInvite li:nth-child(1) a"));
	var twitIcon = driver.findElement(webdriver.By.css("#panelInvite li:nth-child(2) a"));
	var unknownIcon = driver.findElement(webdriver.By.css("#panelInvite li:nth-child(3) a"));

	// check url
	inviteTab.click();
	driver.wait(webdriver.until.elementIsVisible(fbIcon), 5000);

	fbIcon.getAttribute('href').then(function(url){
		expect(url).to.have.string('facebook')
							.and.have.string('insidehook');
	});
	twitIcon.getAttribute('href').then(function(url){
		expect(url).to.have.string('twitter')
							.and.have.string('InsideHook');
  });

	// facebook icon links to "Post to Facebook"
	fbIcon.click(); driver.sleep(1000);
	driver.getAllWindowHandles().then(function(tabs) {
		driver.switchTo().window(tabs[1]);
		expect(driver.getTitle()).to.eventually.equal('Facebook');
		driver.close(); driver.switchTo().window(tabs[0]);
  });

	// twitter icon links to "Post to Twitter"
	twitIcon.click(); driver.sleep(1000);
	driver.getAllWindowHandles().then(function(tabs) {
		driver.switchTo().window(tabs[1]);
		expect(driver.getTitle()).to.eventually.equal('Post a Tweet on Twitter');
		driver.close(); driver.switchTo().window(tabs[0]);
	});

}
