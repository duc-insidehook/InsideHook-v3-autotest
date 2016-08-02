var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    featuredGrid0 = require('./featured-grid-0.js');

exports.ad = function(driver) {

	// wait until grid items load, timeout 10s
	featuredGrid0.gridItemAppear(driver);

	// there are two ads, one next to feature and one under feature
	// only one should be visible at a time, depending on window size
	var visibleAd;
	var ads = driver.findElements(webdriver.By.css(".ad-feat"));
	ads.then(function(ads) {
		expect(ads.length).to.equal(2);

		//find which ad is displaying
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

