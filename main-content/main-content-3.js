/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));
    
// Prerequisite Test
var mainContent2 = require('./main-content-2.js');


/**
 *  Tags click through to appropriate destination
 *  - retrive body contents
 *  - click on a random tag
 */
exports.tags = function(driver) {

  // retrieve body contents
  var bodyContents = mainContent2.imageAndBody(driver);
  // socialStick, tags, share, znetBlock

  var tags = bodyContents[1];
  var tagsLink = tags.findElements(webdriver.By.tagName('a'));
  tagsLink.then(function(tagsLink) {
    
    // click on a random tag
    var index = Math.floor(Math.random() * tagsLink.length);
    tagsLink[index].getAttribute('href').then(function(linkUrl) {
      
      tagsLink[index].click();
      driver.wait(webdriver.until.stalenessOf(tagsLink[index]), 10000);
      expect(driver.getCurrentUrl()).to.eventually.have.string(linkUrl);
    });
  });

}
