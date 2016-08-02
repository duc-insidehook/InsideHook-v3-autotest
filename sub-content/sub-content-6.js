var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    subContent4 = require('./sub-content-4.js');
chai.use(require('chai-as-promised'));
    
exports.clickArticles = function(driver) {

	var content = subContent4.moreArticles(driver);
	var articles = content[1];

	articles.then(function(articles) {
		// test opening a one of the latest 3 articles
		var testArticle = Math.floor(Math.random() * 3);
		var anchor = articles[testArticle].findElement(webdriver.By.css(".panel a"));
		
		anchor.getAttribute('href').then(function(linkUrl) {
			anchor.sendKeys(webdriver.Key.ESCAPE);	// need for firefox, optional for chrome	
			anchor.click();		

			driver.wait(webdriver.until.stalenessOf(anchor), 10000);
			expect(driver.getCurrentUrl()).to.eventually.equal(linkUrl);
		});
	});
			
}
