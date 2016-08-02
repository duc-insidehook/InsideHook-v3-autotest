var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    featuredGrid1 = require('./featured-grid-1.js'),
    expect = chai.expect;
    
exports.featuredItemClick = function(driver, rawTemplate) {

	var typeOfTest = Math.floor(Math.random() * 2);

	if (typeOfTest==1) {  // test featured title 
		var feature = featuredGrid1.opaqueOnHover(driver, rawTemplate);
		var featuredTitle = feature.findElement(webdriver.By.css(".panel h2 a"));
		featuredTitle.getAttribute("href").then(function(linkUrl) {
			featuredTitle.click();
			driver.wait(webdriver.until.stalenessOf(feature), 10000);
			driver.getCurrentUrl().then(function(currentUrl) {
				expect(currentUrl).to.equal(linkUrl);
			});
		});
	}
	else {  // test featured image
		var feature = featuredGrid1.opaqueOnHover(driver, rawTemplate);
		var anchor = feature.findElement(webdriver.By.css("a"));
		expect(anchor.getInnerHtml()).to.eventually.have.string("<img");
		anchor.getAttribute("href").then(function(linkUrl) {
			// normal direct click on the article would result in clicking in the middle of the article,
			// test will fail because the text paragraph panel will receive the click instead
			// this action sequence move 100 pixels away from the top left corner of the feature article and click
			new webdriver.ActionSequence(driver).
	  			mouseMove(feature, {x:100, y:100}).
	  			click().perform(); 
	  	driver.wait(webdriver.until.stalenessOf(feature), 10000);
			driver.getCurrentUrl().then(function(currentUrl) {
				expect(currentUrl).to.equal(linkUrl);
			});
		});
	}

}
