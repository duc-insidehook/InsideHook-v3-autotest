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
 *  Goods banner clicks through to goods page
 *	- wait till content feed is fully displayed
 *	- banner displays as expected
 *	- banner clicks through to goods page
 */
exports.goodsBanner = function(driver, rawTemplate) {

	// wait till content feed is fully displayed
	contentFeed1.sevenItemsLatest(driver);

	if( rawTemplate=="home" || rawTemplate=="main-category") {

		// banner displays as expected
		var banner = driver.findElement(webdriver.By.css(".row.show-for-large-up .goods-banner"));
		expect(banner.getAttribute('data-date')).to.eventually.not.equal(null);
		
		var title = banner.findElement(webdriver.By.css("h3")),
				itemLink = banner.findElement(webdriver.By.css("h4 a")),
				detail = banner.findElement(webdriver.By.css("p")),
				imageLink = banner.findElement(webdriver.By.css(".th a")),
				image = imageLink.findElement(webdriver.By.css("img")),
				button = banner.findElement(webdriver.By.css(".button")),
				links = [itemLink, imageLink, button];

		expect(title.getText()).to.eventually.equal("WHAT WE’RE COVETING");
		expect(itemLink.getAttribute('href')).to.eventually.have.string("goods");
		expect(imageLink.getAttribute('href')).to.eventually.have.string("goods");
		expect(button.getAttribute('href')).to.eventually.have.string("goods");
		expect(button.getText()).to.eventually.equal("GET IT HERE");

		// banner clicks through to goods page
		var index = Math.floor(Math.random() * links.length);
		links[index].sendKeys(webdriver.Key.ESCAPE);	// need for firefox, optional for chrome	
		links[index].click();
		driver.wait(webdriver.until.stalenessOf(links[index]), 10000);

		expect(driver.getCurrentUrl(), "wrong destination\n").
			to.eventually.have.string("goods");
	}

	else {
		console.log('\t- the test bellow is not applicable on this template');
	}

}
