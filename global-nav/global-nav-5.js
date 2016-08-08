/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));


/**
 *  Search magnifying glass toggles search overlay
 */
exports.searchGlass = function(driver) {
  
  var searchGlass = driver.findElement(webdriver.By.css(".search-nav a"));
  var searchOverlay = driver.findElement(webdriver.By.css("#searchOverlay"));
  expect(searchOverlay.isDisplayed()).to.eventually.equal(false);

  searchGlass.click();
  driver.wait(webdriver.until.elementIsVisible(searchOverlay), 5000);
  driver.sleep(1000);

  searchGlass.click();
  driver.wait(webdriver.until.elementIsNotVisible(searchOverlay), 5000);
  driver.sleep(1000);

};
