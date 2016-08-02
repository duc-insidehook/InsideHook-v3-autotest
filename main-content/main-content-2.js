var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));
    
exports.imageAndBody = function(driver) {

  var image = driver.findElement(webdriver.By.css(".allow-overlay.art-head"));
  expect(image.isDisplayed()).to.eventually.equal(true);
  expect(image.getInnerHtml()).to.eventually.have.string('<img');
	
  var body = driver.findElement(webdriver.By.css(".row.art-body"));
	var socialStick = body.findElement(webdriver.By.css(".large-1.columns.vertical-social-block.show-for-large-up"));
  var date = body.findElement(webdriver.By.css(".date"));
  var content = body.findElement(webdriver.By.css(".art-content"));
  var tags = body.findElement(webdriver.By.css(".art-tags"));
  var share = body.findElement(webdriver.By.css(".art-share"));
  var znetBlock = body.findElement(webdriver.By.css(".znet-block"));

  var bodyElements = [socialStick, tags, share, znetBlock];

  return bodyElements;

}
