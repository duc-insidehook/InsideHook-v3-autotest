var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
    
exports.opaqueOnHover = function(driver, rawTemplate) {

	if( rawTemplate=='home') {
		var feature = driver.findElement(webdriver.By.css(".featured"));
	} else {
		var feature = driver.findElement(webdriver.By.css(".featured-v2"));
	}
	driver.actions().mouseMove(feature).perform();
	driver.sleep(2000);

	// add assertion to "blue opaque overlay on hover"

	/* // fail test
	var blah = driver.findElement(webdriver.By.css(".featured .th"));  
	blah.getCssValue('background-color').then(function(test) {
		console.log(test);
	});
	//driver.manage().window().getComputedStyle(feature,'::after').getCssValue('background-color');
	featured.getCssValue('Pseudo.::after.element').then(function(test) {
	  console.log(test);
	});
	*/
	
	
	return feature;

}
