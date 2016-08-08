/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));

// Prerequisite Test
var mainContent1 = require('./main-content-1.js'),
    mainContent2 = require('./main-content-2.js');


/**
 *  Social icons click through to appropriate destination
 *  - retrive all social blocks
 *  - put all social block into an array and test a random one
 */
exports.socialIcons = function(driver) {

  // retrieve body contents
  var bodyContents = mainContent2.imageAndBody(driver);
  // socialStick, tags, share, znetBlock

  var verticalSocialBlock = bodyContents[0];
  var bottomSocialBlock = bodyContents[2];
  var topSocialBlock = mainContent1.headerAndSocial(driver);

  // put all social block into an array and test a random one
	var socialBlocks = [topSocialBlock, verticalSocialBlock, bottomSocialBlock];
  var index = Math.floor(Math.random() * socialBlocks.length);
  socialBlocks[index].then(function(socialBlock) {
    
    var socialIcons = socialBlock.findElements(webdriver.By.css("a"));
    socialIcons.then(function(socialIcons) {
      expect(socialIcons.length).to.equal(4);

      // social icons are expected to be listed in this order: fb, linkedin, twitter, mail
      var fbIcon = socialIcons[0];
      var linkedinIcon = socialIcons[1];
      var twitIcon = socialIcons[2];
      var mailIcon = socialIcons[3];
      mailIcon.sendKeys(webdriver.Key.ESCAPE);  // need for firefox, optional for chrome  

      // Test fb Icon
      fbIcon.click(); driver.sleep(1000);
      driver.getAllWindowHandles().then(function(tabs) {
        expect(tabs.length).to.equal(2);

        driver.switchTo().window(tabs[1]);
        expect(driver.getTitle()).to.eventually.have.string("Facebook");
        driver.close(); driver.switchTo().window(tabs[0]);
      });

      // Test gram Icon
      linkedinIcon.click(); driver.sleep(1000);
      driver.getAllWindowHandles().then(function(tabs) {
        expect(tabs.length).to.equal(2);

        driver.switchTo().window(tabs[1]);
        expect(driver.getTitle()).to.eventually.have.string("LinkedIn");
        driver.close(); driver.switchTo().window(tabs[0]);
      });

      // Test twitter Icon
      twitIcon.click(); driver.sleep(1000);
      driver.getAllWindowHandles().then(function(tabs) {
        expect(tabs.length).to.equal(2);

        driver.switchTo().window(tabs[1]);
        expect(driver.getTitle()).to.eventually.have.string("Post a Tweet on Twitter");
        driver.close(); driver.switchTo().window(tabs[0]);
      });

      // Test mail Icon
      mailIcon.click();
      driver.wait(webdriver.until.elementLocated(webdriver.By.css("#modal-send-to-friends")), 5000);
      driver.sleep(1000);

      var closeModal = driver.findElement(webdriver.By.css("#modal-send-to-friends .close-reveal-modal"));
      closeModal.click();
      driver.wait(webdriver.until.elementIsNotVisible(closeModal), 5000);
      driver.sleep(1000);

    });
	});

}
