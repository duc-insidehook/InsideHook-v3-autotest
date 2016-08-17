/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));

// Prerequisite Test
trendingTags1 = require('./trending-tags-1.js');

/**
 *  Trending tags click through to appropriate distination
 *	- check tags' url
 *	- click on a random tag
 */
exports.tagsClick = function(driver) {

	var tags = trendingTags1.tagsDisplay(driver);
	tags.then(function(tags) {

		// check tags' url
		for(var i=0; i<tags.length; i++) {
			var tagLink = tags[i].findElement(webdriver.By.css("a"));
			tagLink.getAttribute('href').then(function(tagUrl) {
				expect(tagUrl).to.have.string('insidehook.com/tags/');
			});
		}

		// click on a random tag
		var index = Math.floor(Math.random() * tags.length);
		var tagText = tags[index].findElement(webdriver.By.css("a h2"));
		tagText.getText().then(function(linkText) {
			
			tags[index].click();
			driver.wait(webdriver.until.stalenessOf(tags[index]), 10000);
			
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
  // remove #
    var str2 = str1.replace("#", "");

  return str2;
}
