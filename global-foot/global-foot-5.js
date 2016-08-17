/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));


/**
 *  Footer Bottom
 *  - expect 4 links and a copyright paragraph
 *  - click on a random link
 */
exports.footerBottom = function(driver) {

  // expect 4 links and a copyright paragraph
  var links = driver.findElements(webdriver.By.css(".footer-section.bottom li a"));
  var copyright = driver.findElement(webdriver.By.css(".footer-section.bottom p"));
  var modalMember = driver.findElement(webdriver.By.css("#modal-member"));
  
  expect(copyright.getText()).to.eventually.equal("COPYRIGHT © 2016 INSIDEHOOK. ALL RIGHTS RESERVED.");

  
  links.then(function(links) {
    expect(links.length, "there are different than 4 links in footer bottom").
      to.equal(4);

    // click on a random link
    var index = Math.floor(Math.random() * links.length);
    links[index].getText().then(function(linkText) {
      links[index].click();

      switch(linkText) {
        case "PRIVACY POLICY":
          driver.wait(webdriver.until.stalenessOf(links[index]), 10000);
          expect(driver.getCurrentUrl()).to.eventually.equal("http://www-stage.insidehook.com/privacy-policy");
          break;
        case "EDITORIAL POLICY":
          driver.wait(webdriver.until.stalenessOf(links[index]), 10000);
          expect(driver.getCurrentUrl()).to.eventually.equal("http://www-stage.insidehook.com/editorial-policy");
          break;
        case "TERMS AND CONDITIONS":
          driver.wait(webdriver.until.stalenessOf(links[index]), 10000);
          expect(driver.getCurrentUrl()).to.eventually.equal("http://www-stage.insidehook.com/terms-conditions");
          break;
        case "MANAGE SUBSCRIPTION":
          driver.wait(webdriver.until.elementIsVisible(modalMember), 5000);
          driver.sleep(1000);
          break;
        default:
          console.log("Err: unrecognized link");
      }
    });
  });

};
