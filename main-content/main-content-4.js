var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    mainContent2 = require('./main-content-2.js');
chai.use(require('chai-as-promised'));
    
exports.znet = function(driver) {

  var bodyElements = mainContent2.imageAndBody(driver);
  // socialStick, tags, share, znetBlock
  
  var znetBlock = bodyElements[3];
  var znetArticles = znetBlock.findElements(webdriver.By.css('.zergentity a'));
  
  // open a random zergnet article
  znetArticles.then(function(znetArticles) {
    var index = Math.floor(Math.random() * znetArticles.length);

    znetArticles[index].click();
    driver.getAllWindowHandles().then(function(tabs) {
      expect(tabs.length).to.equal(2);

      driver.switchTo().window(tabs[1]);
      expect(driver.getCurrentUrl()).to.eventually.have.string('http://www.zergnet.com/');
      driver.close(); driver.switchTo().window(tabs[0]);
    });
  });

}
