/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));

// Prerequisite Test
var globalFoot0 = require('./global-foot-0.js');


/**
 *  Essentials
 *  - retrieve footer elements
 *  - expect 5 titles
 *  - click on a random title
 */
exports.essentials = function(driver) {
  
  // retrieve footer Elements
  var footerElements = globalFoot0.footerElements(driver);
  // elsewhere, theBasics, collections, essentials

  var essentials = footerElements[3];
  var titles = essentials.findElements(webdriver.By.css("h6"));
  var paragraphs = essentials.findElements(webdriver.By.css("h6"));

  /** 
   *	expect 5 titles
   *	- first title is INSIDEHOOK ESSENTIALS
   *	- the other four are article links
   */
  titles.then(function(titles) {
  	expect(titles.length, "there are different than 5 titles near \"INSIDEHOOK ESSENTIALS\"").
      to.equals(5);
		expect(titles[0].getText()).to.eventually.equal("INSIDEHOOK ESSENTIALS");

  	// click on a random title
  	var index = Math.floor(Math.random() * (titles.length-1) + 1) ;
  	var testLink = titles[index].findElement(webdriver.By.css("a"));
  	testLink.getAttribute('href').then(function(linkUrl) {
  		
  		testLink.click();
  		driver.wait(webdriver.until.stalenessOf(testLink), 10000);

  		expect(driver.getCurrentUrl()).to.eventually.equal(linkUrl);
  	});
  });

};
