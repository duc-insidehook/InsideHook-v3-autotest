var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    testEmail = 'valid-email@insidehook.com',
    subscribeForm5 = require('./subscribe-form-5.js');
    
exports.thxForm = function(driver, formPosition) {

	// subscribe to Insidehook with valid email
	var thxForm = subscribeForm5.validInput(driver, formPosition);

	// elements
	var informText = thxForm.findElement(webdriver.By.css(".signup-form p"));
	var emailInput = thxForm.findElement(webdriver.By.css("#thanksForm .thx-email"));
	var updateButton = thxForm.findElement(webdriver.By.css("#thanksForm button"));
  
	/* the following assumptions are made for available editions
		region 1: Nation
		region 2: New York
		region 3: LA
		region 4: San Francisco
		region 5: Chicago */
	thxForm.findElement(webdriver.By.css("#region-1")).then(null, function(nationBox) {
	if (nationBox.name === "NoSuchElementError")
		console.log("\t- subscribed to Nation edition");
	});
	thxForm.findElement(webdriver.By.css("#region-2")).then(null, function(nyBox){
	if (nyBox.name === "NoSuchElementError")
		console.log("\t- subscribed to New York edition");
	});
	thxForm.findElement(webdriver.By.css("#region-3")).then(null, function(laBox){
	if (laBox.name === "NoSuchElementError")
		console.log("\t- subscribed to LA edition");
	});
	thxForm.findElement(webdriver.By.css("#region-4")).then(null, function(sanFranBox){
	if (sanFranBox.name === "NoSuchElementError")
		console.log("\t- subscribed to San Francisco edition");
	});
	thxForm.findElement(webdriver.By.css("#region-5")).then(null, function(chicagoBox){
	if (chicagoBox.name === "NoSuchElementError")
	console.log("\t- subscribed to Chigago edition");
	});
  
  // thank you form display user's email address and current edition
	informText.getText().then(function(text) {
		expect(text).to.have.string(testEmail).
								and.have.string('New York');
	});
	emailInput.getAttribute('value').then(function(email) {
		expect(email).to.equal(testEmail);  
	})

	updateButton.submit();
	driver.wait(webdriver.until.elementIsNotVisible(thxForm), 5000);
	
}

