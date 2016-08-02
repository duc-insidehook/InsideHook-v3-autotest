var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    mainContent1 = require('./main-content-1.js'),
    mainContent2 = require('./main-content-2.js');
  chai.use(require('chai-as-promised'));
    
exports.socialIcons = function(driver) {

  // Gather social blocks from the featured page
  var bodyElements = mainContent2.imageAndBody(driver);
  // socialStick, tags, share, znetBlock
  var verticalSocialBlock = bodyElements[0];
  var bottomSocialBlock = bodyElements[2];
  var topSocialBlock = artMasthead1.titleAndSocial(driver);

	var socialBlocks = [topSocialBlock, verticalSocialBlock, bottomSocialBlock];
  var index = Math.floor(Math.random() * socialBlocks.length);

  socialBlocks[index].then(function(socialBlock) {
    var socialIcons = socialBlock.findElements(webdriver.By.css("a"));
    socialIcons.then(function(socialIcons) {
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
      var stfModal = driver.findElement(webdriver.By.css("#modal-send-to-friends"));
      var close = stfModal.findElement(webdriver.By.css(".close-reveal-modal"));
      close.click();

    });
	});

}
