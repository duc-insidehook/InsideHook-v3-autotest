/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;


/**
 *  category links click through to appropriate category pages
 *  - open of one the three main categories
 *  - open What-To-Buy / Wheels
 */
exports.categoryLinks = function(driver) {

  var categories = ["WHERE TO GO", "WHAT TO BUY", "HOW TO LIVE"];
  var index = Math.floor(Math.random() * categories.length);

  // open of one the three main categories
  var testCategory = driver.findElement(webdriver.By.linkText(categories[index]));
  testCategory.getAttribute('href').then(function(testUrl) {
    testCategory.click();
    driver.wait(webdriver.until.stalenessOf(testCategory), 10000);
    driver.getCurrentUrl().then(function(currentUrl) {
      expect(currentUrl).to.have.string(testUrl);  
    });
  });
  
  // open What-To-Buy / Wheels
  var whatToBuy = driver.findElement(webdriver.By.linkText("WHAT TO BUY"));
  driver.actions().mouseMove(whatToBuy).perform(); 
  driver.sleep(1000);
  driver.findElement(webdriver.By.linkText("WHEELS")).click();
  driver.wait(webdriver.until.stalenessOf(whatToBuy), 10000);
  
  driver.getCurrentUrl().then(function(url) {
    expect(url).to.have.string("wheels");  
  });  
  
};
