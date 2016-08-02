var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    trendingTags1 = require('./trending-tags-1.js');
chai.use(require('chai-as-promised'));
    
exports.tagsClick = function(driver) {

	var tags = trendingTags1.tagsDisplay(driver);
	tags.then(function(tags) {

		// test url of all four tags
		for(var i=0; i<tags.length; i++) {
			var tagsUrl = tags[i].findElement(webdriver.By.css("a"));
			tagsUrl.getAttribute('href').then(function(tagsUrl) {
				expect(tagsUrl).to.have.string('http://www-stage.insidehook.com/tags/');
			});
		}

		// test opening a random tag
		var testTags = Math.floor(Math.random() * tags.length);
		var tagUrl = tags[testTags].findElement(webdriver.By.css("a"));
		tagUrl.getAttribute('href').then(function(tagUrl) {
			tags[testTags].click();
			driver.wait(webdriver.until.stalenessOf(tags[testTags]), 10000);
			expect(driver.getCurrentUrl()).to.eventually.equal(tagUrl);
		});
	});

}