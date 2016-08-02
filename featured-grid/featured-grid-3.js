var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    featuredGrid0 = require('./featured-grid-0.js');
chai.use(require('chai-as-promised'));

exports.gridItemDisplay = function(driver) {

	// wait until grid items load, timeout 10s
	var contentGrid = featuredGrid0.gridItemAppear(driver);
	var gridArticles = contentGrid.findElements(webdriver.By.tagName("article"));

	gridArticles.then(function(articles) {
		expect(articles.length).to.equal(3);

		// variables
		var titleUrl = new Array(),
				titleIndex = 0;

		for(i=0; i<articles.length; i++) {
			// expect every article has index, date, hour, and edition
			expect(articles[i].getAttribute("data-index")).to.eventually.not.equal(null);
			expect(articles[i].getAttribute("data-date")).to.eventually.not.equal(null);
			expect(articles[i].getAttribute("data-hour")).to.eventually.not.equal(null);
			expect(articles[i].getAttribute("data-edition")).to.eventually.not.equal(null);

			// expect image's url and title's url of the same article to equal
			var imageUrl = articles[i].findElement(webdriver.By.css(".th a")).getAttribute('href');
			titleUrl[i] = articles[i].findElement(webdriver.By.css(".panel h3 a")).getAttribute('href');
			imageUrl.then(function(imageUrl) {
				expect(titleUrl[titleIndex++]).to.eventually.equal(imageUrl);
			});
		}
	});

	return gridArticles;

}
