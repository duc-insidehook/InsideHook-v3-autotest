/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));

// Prerequisite Test
subcatHeader1 = require('./subcat-header-1.js');


/**
 *  Sub-categories click through to appropriate destination
 *	- retrieve subCat list
 *	- click on a random category
 */
exports.clickThrough = function(driver) {

	// retrieve subCat list
	var subcat = subcatHeader1.appear(driver);
	subcat.then(function(subcat) {

		/**
		 *	click on a random category
		 *	-	avoid clicking the more-dropdown when there're more than 6 sub categories
		 */
		var index = 5;
		while( index==5) {
			var index = Math.floor(Math.random() * subcat.length);
		}
		
		subcat[index].getText().then(function(linkText) {
			subcat[index].click();
			driver.wait(webdriver.until.stalenessOf(subcat[index]), 10000);
			
			expect(driver.getCurrentUrl(), "wrong destination\n").
				to.eventually.have.string(toUrlText(linkText));
		});
	});
}


/**
 *  Convert a string from a linkText to a string that appear in url
 */ 
var toUrlText = function(linkText) {

  // convert to lower case
    var str1 = linkText.toLowerCase();
  // replace space with dash
    var str2 = str1.replace(/ /g, "-");
  // replace & with and
    var str3 = str2.replace("&", "and");

  return str3;
}
