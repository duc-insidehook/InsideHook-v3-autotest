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
 *  Good items click to appropriate destination
 *	- retrieve good items
 *	- test one of the first three articles
 */
exports.clickgoodItems = function(driver) {

	// retrieve good items
	var goods = contentGood1.twelveGoods(driver);
	
	articles = goods.findElements(webdriver.By.css("article"));
	articles.then(function(articles) {
				
		// choose one of the first three articles
		var index = Math.floor(Math.random() * 3);

		/**
		 *	choose type of test
		 *	- front panel's title
		 *	- front panel's image
		 *	- back panel's title
		 *	- back panel's fitbox
		 */
		var typeOfTest = Math.floor(Math.random() * 4);

		// click on front panel's title
		if( typeOfTest == 0) {
			var itemLink = articles[index].findElement(webdriver.By.css("h3 a"));
			itemLink.click();
			driver.wait(webdriver.until.stalenessOf(itemLink), 10000);

			driver.getTitle().then(function(title) {
	       console.log("\tGoods item: "+title);
	    });
		}

		else {
			// front panel's image
			if( typeOfTest == 1) {
				var itemLink = articles[index].findElement(webdriver.By.css(".th a"));
			}

			// back panel's title
			else if( typeOfTest == 2) {
				driver.actions().mouseMove(articles[index]).perform();
				var moreButton = articles[index].findElement(webdriver.By.css("button"));
				moreButton.click(); driver.sleep(1000);

				var itemLink = articles[index].findElement(webdriver.By.css(".back-panel h3 a"));
			}

			// back panel's fitbox
			else if( typeOfTest == 3) {
				driver.actions().mouseMove(articles[index]).perform();
				var moreButton = articles[index].findElement(webdriver.By.css("button"));
				moreButton.click(); driver.sleep(1000);

				var itemLink = articles[index].findElement(webdriver.By.css(".fit-box a"));
			}

			itemLink.click(); driver.sleep(1000);

			driver.getAllWindowHandles().then(function(tabs) {
				expect(tabs.length, "item cannot be clicked/ will not open").
					to.equal(2);
				
				// print good item's title
	      driver.switchTo().window(tabs[1]);
	      driver.getTitle().then(function(title) {
		      console.log("\tGoods item: "+title);
		    });
	      driver.close(); driver.switchTo().window(tabs[0]);
	    });
		}
		
	});
	
}
