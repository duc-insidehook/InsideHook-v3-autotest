/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;


/**
 *  Category links click through to appropriate category pages
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
    var testCatItem = dropDownItems[index].findElement(webdriver.By.css("a"));
    testCatItem.getText().then(function(linkText) {

      testCatItem.click();
      driver.wait(webdriver.until.stalenessOf(testCatItem), 10000);
      driver.getCurrentUrl().then(function(currentUrl) {

        expect(currentUrl, "main category clicks to wrong destination\n").
          to.have.string(toUrlText(linkText));
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
      var testSubCatItem = subCategories[index];
      testSubCatItem.getText().then(function(linkText) {

        testSubCatItem.click();
        driver.wait(webdriver.until.stalenessOf(testSubCatItem), 10000);
        driver.getCurrentUrl().then(function(currentUrl) {

          expect(currentUrl, "sub category clicks to wrong destination\n").
            to.have.string(toUrlText(linkText));
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

    testCategory.click();
    driver.wait(webdriver.until.stalenessOf(testCategory), 10000);
    driver.getCurrentUrl().then(function(currentUrl) {

      expect(currentUrl, "main category clicks to wrong destination").
        to.have.string("where-to-go");
    });

    // Test a sepcific sub category
    var whatToBuy = driver.findElement(webdriver.By.linkText("WHAT TO BUY"));
    driver.actions().mouseMove(whatToBuy).perform(); 
    driver.sleep(1000);
    wheels = driver.findElement(webdriver.By.linkText("WHEELS"));

    wheels.click();
    driver.wait(webdriver.until.stalenessOf(wheels), 10000);
    driver.getCurrentUrl().then(function(currentUrl) {
        
      expect(currentUrl, "sub category clicks to wrong destination").
        to.have.string("wheels");  
    });
  }

};


/**
 *  Convert a string from a linkText to a string that appear in url
 */ 
var toUrlText = function(linkText) {

  // convert to lower case
    var str1 = linkText.toLowerCase();
  // replace space with dash
    var str2 = str1.replace(/ /g, "-");
  // replace & with and
    var str3 = str2.replace("&", "and");

  return str3;
}
