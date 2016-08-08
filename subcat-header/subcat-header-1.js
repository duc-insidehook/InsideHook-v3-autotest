/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));
 

/**
 *  Section has one h1 header and sub-categories
 *	- if there are more than 6 subcat items, a more dropdown appear
 */
exports.appear = function(driver) {

	driver.wait(webdriver.until.elementLocated(webdriver.By.css(".cat-header")), 10000);
	
	var h1 = driver.findElement(webdriver.By.css(".cat-header h1"));
	var subcat = driver.findElements(webdriver.By.css(".subcat-list.show-for-medium-up a"));

	// if there are more than 6 subcat items, a more dropdown appear
	subcat.then(function(subcat) {
		if( subcat.length >=6) {
			subcat[5].getText().then(function(linkText) {

				if( linkText=='MORE') {
					var moreLink = driver.findElement(webdriver.By.linkText("MORE"));
					driver.actions().mouseMove(h1).mouseMove(moreLink).perform();
					driver.wait(webdriver.until.elementIsVisible(subcat[subcat.length-1]), 5000);
					driver.sleep(1000);
				}
			});
		}
	});

	return subcat;
	
}
