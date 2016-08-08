/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect; 
chai.use(require('chai-as-promised'));

// Prerequisite Test
subContent1 = require('./sub-content-1.js');


/**
 *  Items click through to appropriate destination
 *  - click on the latest tab and expect 7 articles initially
 *  - click on one of the lastest 3 articles
 */
exports.clickContentFeed = function(driver) {

	// click on the latest tab and expect 7 articles initially
	var feedLatest = subContent1.fiveItemsLatest(driver);

	var feedItems = feedLatest.findElements(webdriver.By.css("h4"));
	feedItems.then(function(articles) {
		
		// click on one of the lastest 3 articles
		var index = Math.floor(Math.random() * 3);
		var articleLink = articles[index].findElement(webdriver.By.css("a"));
		articleLink.getAttribute('href').then(function(linkUrl) {
			articleLink.sendKeys(webdriver.Key.ESCAPE);	// need for firefox, optional for chrome	
			articleLink.click();
			
			if (linkUrl.includes("insidehook")) {
				driver.wait(webdriver.until.stalenessOf(articleLink), 10000);
				expect(driver.getCurrentUrl()).to.eventually.equal(linkUrl);
			} 
			else { // if power by another party, link will be opened in a new tab
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

