var webdriver = require('selenium-webdriver');

exports.buildDriverTimeout = function() {
	// timeout for setting up and build a web driver
	return 30000; // ms
}

exports.loadTemplateTimeout = function() {
	// timeout for loading template(url) into web driver 
	return 20000; // ms
}

exports.individualTestTimeout = function() {
	 // timeout for each individual test case
	return 60000; // ms
}

exports.pageLoadTime = function(driver) {
	// wait till page loads its last element
	return 5000; // ms
}