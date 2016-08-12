/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));

// Prerequisite Test
var contentGood1 = require('./content-good-1.js');

/**
 *  good items have front and back panels that can be toggled
 *	- retrieve good items
 *	- choose one of the first three articles
 */    
exports.togglePannel = function(driver) {

	// retrieve good items
	var goods = contentGood1.twelveGoods(driver);
	articles = goods.findElements(webdriver.By.css("article"));

	articles.then(function(articles) {

		// choose one of the first three articles
		var index = Math.floor(Math.random() * 3);
		var backPanel = articles[index].findElement(webdriver.By.css(".back-panel"));
	  var moreButton = articles[index].findElement(webdriver.By.css("button"));
	  
	  driver.actions().mouseMove(articles[index]).perform();
	  driver.sleep(1000);

	  // toggle front and back panel
	  moreButton.click();
	  driver.wait(webdriver.until.elementIsVisible(backPanel), 5000);
	  driver.sleep(1000);
	  
	  moreButton.click();
	  driver.wait(webdriver.until.elementIsNotVisible(backPanel), 5000);
	  driver.sleep(1000);
    
	});

}
