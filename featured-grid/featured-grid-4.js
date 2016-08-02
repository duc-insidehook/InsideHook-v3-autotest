var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    featuredGrid3 = require('./featured-grid-3.js');
chai.use(require('chai-as-promised'));

exports.gridItemClick = function(driver) {

	var gridArticles = featuredGrid3.gridItemDisplay(driver);
	gridArticles.then(function(articles) {

		// test opening a random article
		var testArticle = Math.floor(Math.random() * articles.length);
		var articleLink = articles[testArticle].findElement(webdriver.By.css(".th a"));
		articleLink.getAttribute('href').then(function(linkUrl) {
			articleLink.click();
			driver.wait(webdriver.until.stalenessOf(articleLink), 10000);
			expect(driver.getCurrentUrl()).to.eventually.equal(linkUrl);
		});
	});

}
