/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));


/**
 *  Featured and more articles appear with h3 header "GO ON, KEEP READING"
 *	- check header text
 *	- check feature article's image and title
 *	- check grid articles' date, hour, edition, image, and title
 */
exports.moreArticles = function(driver) {

	driver.wait(webdriver.until.elementLocated(webdriver.By.css(".flexible-content-grid.art-grid-feed")), 10000);

	var grid = driver.findElement(webdriver.By.css(".flexible-content-grid.art-grid-feed"));
	var h3 = grid.findElement(webdriver.By.css("h3"));
	var featured = grid.findElement(webdriver.By.css(".featured-v2"));
	var articles = grid.findElements(webdriver.By.css("article"));

	// check header text
	expect(h3.getText()).to.eventually.equal("GO ON, KEEP READING:");

	// check feature article
	var imageUrl = featured.findElement(webdriver.By.css(".th a")).getAttribute('href');
	imageUrl.then(function(imageUrl) {
		var titleUrl = featured.findElement(webdriver.By.css(".panel a")).getAttribute('href');
		expect(titleUrl).to.eventually.equal(imageUrl);
	});

	// check grid articles
	articles.then(function(articles) {
		
		var titleUrl = new Array(),
				titleIndex = 0;

		expect(articles.length).to.equal(6);
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
	});

	return [featured, articles, grid];

}
