/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));


/**
 *  Cities drop down on hover and clicks through to appropriate page
 *  - find what edition is displaying
 *  - change edition
 *  - expect a different edition
 */
exports.citiesLink = function(driver) {

  /*
   *  find all elements on global-nav top-bar with dropdown class
   *  cities tab is assumed to be the last element
   */
  var categories = driver.findElements(webdriver.By.css(".global-navigation.top-bar .left.show-for-large-up .has-dropdown.not-click"));
  categories.then(function(categories) {
    var cities = categories[categories.length-1].findElement(webdriver.By.tagName("a"));
    cities.getText().then(function(currentCity) {

      driver.actions().mouseMove(cities).perform();
      driver.sleep(1000);

      // change edition
      if( currentCity == 'CITIES') {
        driver.findElement(webdriver.By.linkText("NEW YORK")).click();
        driver.wait(webdriver.until.stalenessOf(cities), 10000);
      } else {
        driver.findElement(webdriver.By.linkText("NATION")).click();
        driver.wait(webdriver.until.stalenessOf(cities), 10000);
      }

      // expect a different edition
      var categories = driver.findElements(webdriver.By.css(".global-navigation.top-bar .left.show-for-large-up .has-dropdown.not-click"));
      categories.then(function(categories) {
        var cities = categories[3].findElement(webdriver.By.tagName("a"));
        if( currentCity == 'CITIES') {
          expect(cities.getText(), "cannot change from nation edition to NY edtion").
            to.eventually.equal('NEW YORK');
        } else {
          expect(cities.getText(), "cannot change from a city edition to nation edition").
            to.eventually.equal('CITIES');
        }
      });
    });
  });
  
};
