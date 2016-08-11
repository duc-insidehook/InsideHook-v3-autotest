/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));


/**
 *  Image and article body appear as expected
 *  - retrieve all body contents and return in an array format
 */
exports.imageAndBody = function(driver) {

  var image = driver.findElement(webdriver.By.css(".allow-overlay.art-head img"));
  expect(image.isDisplayed()).to.eventually.equal(true);
	
  var body = driver.findElement(webdriver.By.css(".row.art-body"));
	var leftSocialStick = body.findElement(webdriver.By.css(".large-1.columns.vertical-social-block.show-for-large-up"));
  var date = body.findElement(webdriver.By.css(".date"));
  var content = body.findElement(webdriver.By.css(".art-content"));
  var tags = body.findElement(webdriver.By.css(".art-tags"));
  var bottomSocialShare = body.findElement(webdriver.By.css(".art-share"));
  var znetBlock = body.findElement(webdriver.By.css(".znet-block"));

  var bodyContents = [leftSocialStick, tags, bottomSocialShare, znetBlock];

  return bodyContents;

}
