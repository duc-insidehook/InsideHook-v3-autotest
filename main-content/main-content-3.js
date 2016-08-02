var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    mainContent2 = require('./main-content-2.js');
chai.use(require('chai-as-promised'));
    
exports.tags = function(driver) {

  var bodyElements = mainContent2.imageAndBody(driver);
  // socialStick, tags, share, znetBlock
  
  var tags = bodyElements[1];
  var tagsLink = tags.findElements(webdriver.By.tagName('a'));
  tagsLink.then(function(tagsLink) {
    var index = Math.floor(Math.random() * tagsLink.length);
    tagsLink[index].getAttribute('href').then(function(linkUrl) {
      tagsLink[index].click();
      driver.wait(webdriver.until.stalenessOf(tagsLink[index]), 10000);
      expect(driver.getCurrentUrl()).to.eventually.have.string(linkUrl);
    });
  });

}
