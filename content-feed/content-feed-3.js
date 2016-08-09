/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));

// Prerequisite Test
var contentFeed1 = require('./content-feed-1.js');


/**
 *  Items click through to appropriate destination
 *	- click on the latest tab and expect 7 articles initially
 *	- check articles' date, hour, edition
 *	- check image's url and title's url
 *	- open a one of the lastest three articles
 */
exports.clickContentFeed = function(driver) {

	// click on the latest tab and expect 7 articles initially
	var feedLatest = contentFeed1.sevenItemsLatest(driver);
	var feedItems = feedLatest.findElements(webdriver.By.css("article"));
	
	feedItems.then(function(articles) {

		var titleUrl = new Array(),
				titleIndex = 0;  // use to loop through titleUrl

		for(i=0; i<articles.length; i++) {
			// check articles' date, hour, edition
			expect(articles[i].getAttribute("data-date")).to.eventually.not.equal(null);
			expect(articles[i].getAttribute("data-hour")).to.eventually.not.equal(null);
			expect(articles[i].getAttribute("data-edition")).to.eventually.not.equal(null);

			// check image url's and title's url
			var imageUrl = articles[i].findElement(webdriver.By.css(".th a")).getAttribute('href');
			titleUrl[i] = articles[i].findElement(webdriver.By.css(".panel a")).getAttribute('href');
			imageUrl.then(function(imageUrl) {
				expect(titleUrl[titleIndex++], "title and image don't have the same url").
					to.eventually.equal(imageUrl);
			});
		}
		
		// open a one of the lastest three articles
		var testArticle = Math.floor(Math.random() * 3);
		var articleLink = articles[testArticle].findElement(webdriver.By.css(".panel a"));
		articleLink.getAttribute('href').then(function(linkUrl) {
			articleLink.sendKeys(webdriver.Key.ESCAPE);	// need for firefox, optional for chrome	
			articleLink.click();
			
			// article within Insidehook domain
			if (linkUrl.includes("insidehook")) {
				driver.wait(webdriver.until.stalenessOf(articleLink), 10000);
				expect(driver.getCurrentUrl(), "wrong destination\n").
					to.eventually.equal(linkUrl);
			} 
			// article power by another party - required opening new tab
			else { 
				driver.getAllWindowHandles().then(function(tabs) {
					expect(tabs.length, "item cannot be clicked/ will not open").
						to.equal(2);
						
      		driver.switchTo().window(tabs[1]);
      		expect(driver.getCurrentUrl(), "wrong destination\n").
      			to.eventually.have.string(linkUrl);
      		driver.close(); driver.switchTo().window(tabs[0]);
      	});
			}
		});		
	});

}
