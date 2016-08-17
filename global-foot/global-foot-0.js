/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));


/**
 *  Locate and seperate elements in global footer
 *  - expect 3 sub-navs on footer content phone view
 *  - return the 3 sub-navs and essential in an array format
 */
exports.footerElements = function(driver) {
  
  /** 
   *  expect 3 sub-navs on footer content phone view
   *  - Us, elsewhere
   *  - The basics
   *  - Collections
   */
  var subnavs = driver.findElements(webdriver.By.css('.global-footer .sub-nav'));
  subnavs.then(function(subnavs) {
    expect(subnavs.length).to.equal(3);
  });

  // return the 3 sub-navs and essential in an array format
  var footerSection = driver.findElement(webdriver.By.css('.global-footer section:nth-child(3)')),
      elsewhere = footerSection.findElement(webdriver.By.css('div:nth-child(1)')),
      theBasics = footerSection.findElement(webdriver.By.css('div:nth-child(2)')),
      collections = footerSection.findElement(webdriver.By.css('div:nth-child(3)')),
      essentials = footerSection.findElement(webdriver.By.css('div:nth-child(4)'));
  
  var footerElements = [ elsewhere, theBasics, collections, essentials ];

  return footerElements;

}
