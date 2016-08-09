var webdriver = require('selenium-webdriver');


/* ---------- Time Set Up ---------- */

exports.buildDriverTimeout = function() {
	// timeout for setting up and build a web driver
	return 30000; // ms
}

exports.loadTemplateTimeout = function() {
	// timeout for a browser to load a template (an url) 
	return 20000; // ms
}

exports.individualTestTimeout = function() {
	 // timeout for each individual test case
	return 60000; // ms
}

exports.pageLoadTime = function() {
	// wait till page loads its last element - needed for running in Firefox
	return 5000; // ms
}