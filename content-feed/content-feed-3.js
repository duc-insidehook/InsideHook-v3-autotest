var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    contentFeed1 = require('./content-feed-1.js');
chai.use(require('chai-as-promised'));
    
exports.clickContentFeed = function(driver) {

	// select The Latest tab and make sure there'are 7 items initially
	var feedLatest = contentFeed1.sevenItemsLatest(driver);
	var feedItems = feedLatest.findElements(webdriver.By.css("article"));
	
	feedItems.then(function(articles) {
		// variables
		var titleUrl = new Array(),
				titleIndex = 0;

		expect(articles.length).to.be.above(0);
		for(i=0; i<articles.length; i++) {
			// expect every article has index, date, hour, and edition
			expect(articles[i].getAttribute("data-date")).to.eventually.not.equal(null);
			expect(articles[i].getAttribute("data-hour")).to.eventually.not.equal(null);
			expect(articles[i].getAttribute("data-edition")).to.eventually.not.equal(null);

			// expect image's url and title's url of the same article to equal
			var imageUrl = articles[i].findElement(webdriver.By.css(".th a")).getAttribute('href');
			titleUrl[i] = articles[i].findElement(webdriver.By.css(".panel a")).getAttribute('href');
			imageUrl.then(function(imageUrl) {
				expect(titleUrl[titleIndex++]).to.eventually.equal(imageUrl);
			});
		}
		
		// test opening a one of the lastest 3 articles
		var testArticle = Math.floor(Math.random() * 3);
		var articleLink = articles[testArticle].findElement(webdriver.By.css(".panel a"));
		articleLink.getAttribute('href').then(function(linkUrl) {
			articleLink.sendKeys(webdriver.Key.ESCAPE);	// need for firefox, optional for chrome	
			articleLink.click();
			
			if (linkUrl.includes("insidehook")) {
				driver.wait(webdriver.until.stalenessOf(articleLink), 10000);
				expect(driver.getCurrentUrl()).to.eventually.equal(linkUrl);
			} else { // if power by another party, link will be opened in a new tab
				driver.getAllWindowHandles().then(function(tabs) {
					expect(tabs.length).to.equal(2);
      		driver.switchTo().window(tabs[1]);
      		expect(driver.getCurrentUrl()).to.eventually.have.string(linkUrl);
      		driver.close(); driver.switchTo().window(tabs[0]);
      	});
			}
		});
		
	});
}

