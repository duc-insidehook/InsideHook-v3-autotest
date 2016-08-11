/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;


/**
 *  category links click through to appropriate category pages
 *  - open one of the main categories
 *  - open one of the sub categories
 *  - open a specific main-category/sub-category - enable by setting specific_test to true
 */
exports.categoryLinks = function(driver) {

  var specific_test = false;

  /**
   *  open one of the main categories
   *  - locate all the dropdowns from nav bar
   *  - exclude the last dropdown which is the cities drop down
   */
  var dropDownItems = driver.findElements(webdriver.By.css(".global-navigation.top-bar .left.show-for-large-up .has-dropdown.not-click"));
  dropDownItems.then(function(dropDownItems) {
    
    // exclude the last dropdown which is the cities drop down
    var index = Math.floor(Math.random() * (dropDownItems.length-1) );
    var testCategory = dropDownItems[index].findElement(webdriver.By.css("a"));
    testCategory.getAttribute('href').then(function(testUrl) {

      testCategory.click();
      driver.wait(webdriver.until.stalenessOf(testCategory), 10000);
      driver.getCurrentUrl().then(function(currentUrl) {

        expect(currentUrl, "main category clicks to wrong destination\n").
          to.equal(testUrl);  
      });
    });
  });
  

  /**
   *  open one of the sub cateogries
   *  - choose a random main category
   *  - find all the sub categories within that main category
   *  - exclude the first 3 items which are not sub categories
   */
  var dropDownItems = driver.findElements(webdriver.By.css(".global-navigation.top-bar .left.show-for-large-up .has-dropdown.not-click"));
  dropDownItems.then(function(dropDownItems) {
    
    // choose a random main category
    var index = Math.floor(Math.random() * (dropDownItems.length-1) );
    driver.actions().mouseMove(dropDownItems[index]).perform();
    driver.sleep(1000);

    // find all the sub categories within that main category
    var subCategories = dropDownItems[index].findElements(webdriver.By.css("a"));
    subCategories.then(function(subCategories) {

      // exclude the first 3 items which are not sub categories
      var index = Math.floor(Math.random() * (subCategories.length-3) +3);
      var testSubCat = subCategories[index];
      testSubCat.getAttribute('href').then(function(testUrl) {

        testSubCat.click();
        driver.wait(webdriver.until.stalenessOf(testSubCat), 10000);
        driver.getCurrentUrl().then(function(currentUrl) {

          expect(currentUrl, "sub category clicks to wrong destination\n").
            to.equal(testUrl);
        });
      });
    });
  });


  /** 
   *  open a specific main/sub cateogry
   */
  if( specific_test) {

    // Test a specific main category
    var testCategory = driver.findElement(webdriver.By.linkText('WHERE TO GO'));
    testCategory.getAttribute('href').then(function(testUrl) {

      testCategory.click();
      driver.wait(webdriver.until.stalenessOf(testCategory), 10000);
      driver.getCurrentUrl().then(function(currentUrl) {

        expect(currentUrl, "main category clicks to wrong destination").
          to.equal(testUrl);  
      });
    });

    // Test a sepcific sub category
    var whatToBuy = driver.findElement(webdriver.By.linkText("WHAT TO BUY"));
    driver.actions().mouseMove(whatToBuy).perform(); 
    driver.sleep(1000);
    wheels = driver.findElement(webdriver.By.linkText("WHEELS"));
    wheels.getAttribute('href').then(function(testUrl) {

      wheels.click();
      driver.wait(webdriver.until.stalenessOf(wheels), 10000);
      driver.getCurrentUrl().then(function(currentUrl) {
        
        expect(currentUrl, "sub category clicks to wrong destination").
          to.equal(testUrl);  
      });  
    });
  }

};





