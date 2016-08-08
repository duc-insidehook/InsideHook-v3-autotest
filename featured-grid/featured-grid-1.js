/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;


/**
 *  Featured item gets a blue opaque overlay on hover
 */
exports.opaqueOnHover = function(driver, rawTemplate) {

	if( rawTemplate=='main-category') {
		var feature = driver.findElement(webdriver.By.css(".featured-v2"));
	} 
	else {  // rawTemplate = home
		var feature = driver.findElement(webdriver.By.css(".featured"));
	}
	driver.actions().mouseMove(feature).perform();
	driver.sleep(2000);

	/**
	 *	INCOMPLETE TEST
	 *	- add assertion to blue opaque overlay on hover here
	 */

	return feature;

}
