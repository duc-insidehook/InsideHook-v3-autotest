/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));
    

/**
 *  12 items appear in goods
 */
exports.twelveGoods = function(driver) {
	
	driver.wait(webdriver.until.elementLocated(webdriver.By.css(".flexible-content-grid .media-group")), 10000);

	var goods = driver.findElement(webdriver.By.css(".flexible-content-grid .goods-content"));

	var articles = goods.findElements(webdriver.By.css("article"));
	articles.then(function(articles) {
		expect(articles.length).to.equal(12);	

		var titleUrl = new Array(),
				titleIndex = 0;  // use to loop through titleUrl

		for(i=0; i<articles.length; i++) {
			// check articles' index, date
			expect(articles[i].getAttribute("data-index")).to.eventually.not.equal(null);
			expect(articles[i].getAttribute("data-date")).to.eventually.not.equal(null);

			// check image url's and title's url
			var imageUrl = articles[i].findElement(webdriver.By.css(".th a")).getAttribute('href');
			titleUrl[i] = articles[i].findElement(webdriver.By.css(".panel a")).getAttribute('href');
			imageUrl.then(function(imageUrl) {
				expect(titleUrl[titleIndex++], "title and image don't have the same url").
					to.eventually.equal(imageUrl);
			});
		}
	});
	
	return goods;

}
