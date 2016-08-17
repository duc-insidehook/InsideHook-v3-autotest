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
 *  Collections
 *  - retrieve footer elements
 *  - expect correct tittle and 5 links
 *  - click on a random link
 */
exports.collections = function(driver) {
  
  // retrieve footer Elements
  var footerElements = globalFoot0.footerElements(driver);
  // elsewhere, theBasics, collections, essentials

  var collections = footerElements[2];
  var title = collections.findElement(webdriver.By.css("dt h6"));
  var links = collections.findElements(webdriver.By.css("dd a"));

  // expect correct title and 5 (social) links
  expect(title.getText()).to.eventually.equal("COLLECTIONS");
  links.then(function(links) {
    expect(links.length, "there are different than 5 links under \"COLLECTIONS\"").
      to.equal(5);

    // click on a random link
    var index = Math.floor(Math.random() * links.length);
    links[index].getText().then(function(linkText) {
      links[index].click();
      driver.wait(webdriver.until.stalenessOf(links[index]), 10000);

      switch(linkText) {
        case "ASK ESTHER":
          expect(driver.getCurrentUrl()).to.eventually.equal("http://www-stage.insidehook.com/tags/askesther");
          break;
        case "COCKTAILS":
          expect(driver.getCurrentUrl()).to.eventually.equal("http://www-stage.insidehook.com/tags/cocktails");
          break;
        case "BEST OF LISTS":
          expect(driver.getCurrentUrl()).to.eventually.equal("http://www-stage.insidehook.com/search?t=bestof,recommendations,staffpicks");
          break;
        case "ITINERARIES":
          expect(driver.getCurrentUrl()).to.eventually.equal("http://www-stage.insidehook.com/search?t=37things,dinnerplan,falltravel,rentalguide,summertravel,travelguide,wintertravel");
          break;
        case "TABLE STAKES":
          expect(driver.getCurrentUrl()).to.eventually.equal("http://www-stage.insidehook.com/tags/tablestakes");
          break;
        default:
          console.log("Err: unrecognized link");
      }
    }); 
  });

};
