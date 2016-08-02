var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));

exports.gridItemAppear = function(driver) {

	// Improtant Note: grid articles section is located by xpath which might be changed in the future
	// wait until grid items load, timeout 10s
	driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//*[@id='appContainer']/section[2]/div[2]/div[2]")), 10000);
	var contentGrid = driver.findElement(webdriver.By.xpath("//*[@id='appContainer']/section[2]/div[2]"));
	
	return contentGrid;

}
