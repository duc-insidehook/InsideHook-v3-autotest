//	Import Modules
var webdriver = require('selenium-webdriver');

//	Locate and return content grid using xpath
exports.gridItemAppear = function(driver) {

	// Improtant Note: grid articles section is located by xpath which might be changed in the future
	driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//*[@id='appContainer']/section[2]/div[2]/div[2]")), 10000);
	var contentGrid = driver.findElement(webdriver.By.xpath("//*[@id='appContainer']/section[2]/div[2]"));
	
	return contentGrid;

}
