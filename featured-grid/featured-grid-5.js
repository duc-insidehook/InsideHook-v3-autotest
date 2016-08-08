/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;

// Prerequisite Test
var featuredGrid0 = require('./featured-grid-0.js');


/**
 *  300x250 ad appears
 *	- locate displaying ad in the grid 
 *	- expect frame size is 300x250
 */
exports.ad = function(driver) {

	// wait for grid to appear
	featuredGrid0.gridItemAppear(driver);

	/**
	 *	locate displaying ad in the grid 
	 *	there are two ads, one next to feature and one under feature
	 *	only one should be visible at a time, depending on window size
	 */
	var visibleAd;
	var ads = driver.findElements(webdriver.By.css(".ad-feat"));
	ads.then(function(ads) {
		expect(ads.length).to.equal(2);

		ads[0].isDisplayed().then(function(firstAdIsDisplayed) {
			if( firstAdIsDisplayed ) {
				visibleAd = 0;
			} else {
				expect(ads[1].isDisplayed).to.eventually.equal(true);
				visibleAd = 1;
			}
		});

		// expect frame size is 300x250
		var ads = driver.findElements(webdriver.By.css(".ad-feat"));
		ads.then(function(ads) {
			ads[visibleAd].findElement(webdriver.By.css("iframe")).then(function(adFrame) {
				adFrame.getSize().then(function(frame) {
					expect(frame.width).to.equal(300);
					expect(frame.height).to.equal(250);
				});	
			});
		});

	});

}

