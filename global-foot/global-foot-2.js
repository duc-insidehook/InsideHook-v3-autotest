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
 *  The Basics
 *  - retrieve footer elements
 *  - expect correct tittle and 5 links
 *  - click on a random link
 */
exports.theBasics = function(driver) {
  
  // retrieve footer Elements
  var footerElements = globalFoot0.footerElements(driver);
  // elsewhere, theBasics, collections, essentials

  var theBasics = footerElements[1];
  var title = theBasics.findElement(webdriver.By.css("dt h6"));
  var links = theBasics.findElements(webdriver.By.css("dd a"));

  // expect correct title and 5 (social) links
  expect(title.getText()).to.eventually.equal("THE BASICS");
  links.then(function(links) {
    expect(links.length, "there are different than 5 links under \"THE BASICS\"").
      to.equal(5);

    // click on a random link
    var index = Math.floor(Math.random() * links.length);
    links[index].getText().then(function(linkText) {
      links[index].click();
      driver.wait(webdriver.until.stalenessOf(links[index]), 10000);

      switch(linkText) {
        case "ABOUT US":
        expect(driver.getCurrentUrl()).to.eventually.equal("http://www.insidehook.com/about-us");
          break;
        case "EDITORIAL POLICY":
          expect(driver.getCurrentUrl()).to.eventually.equal("http://www.insidehook.com/editorial-policy");
          break;
        case "TERMS":
          expect(driver.getCurrentUrl()).to.eventually.equal("http://www.insidehook.com/terms-conditions");
          break;
        case "PRIVACY":
          expect(driver.getCurrentUrl()).to.eventually.equal("http://www.insidehook.com/privacy-policy");
          break;
        case "CAREERS":
          expect(driver.getCurrentUrl()).to.eventually.equal("http://www.insidehook.com/careers");
          break;
        default:
          console.log("Err: unrecognized link");
      }
    }); 
  });

};
