var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));
    
exports.socialButtons = function(driver) {

  // find all elements on global-nav top-bar with round class
  // social icons are expected to be listed in this order: fb, gram, twitter
  var socialIcons = driver.findElements(webdriver.By.css(".global-navigation.top-bar .right.show-for-medium-up .round"));
  socialIcons.then(function(socialIcons) {
    var fbIcon = socialIcons[0];
    var gramIcon = socialIcons[1];
    var twitIcon = socialIcons[2];

    // Test href Attribute
    expect(fbIcon.getAttribute('href')).to.eventually.equal('https://www.facebook.com/InsideHook');
    expect(gramIcon.getAttribute('href')).to.eventually.equal('http://instagram.com/insidehook');
    expect(twitIcon.getAttribute('href')).to.eventually.equal('https://twitter.com/#!/InsideHook');
    
    // Test fb Icon
    fbIcon.click();
    driver.getAllWindowHandles().then(function(tabs) {
      expect(tabs.length).to.equal(2);

      driver.switchTo().window(tabs[1]);
      expect(driver.getCurrentUrl()).to.eventually.equal("https://www.facebook.com/InsideHook");
      expect(driver.getTitle()).to.eventually.equal("InsideHook | Facebook");
      driver.close(); driver.switchTo().window(tabs[0]);
    });

    // Test gram Icon
    gramIcon.click();
    driver.getAllWindowHandles().then(function(tabs) {
      expect(tabs.length).to.equal(2);

      driver.switchTo().window(tabs[1]);
      expect(driver.getCurrentUrl()).to.eventually.equal("https://www.instagram.com/insidehook/");
      expect(driver.getTitle()).to.eventually.equal("InsideHook (@insidehook) • Instagram photos and videos");
      driver.close(); driver.switchTo().window(tabs[0]);
    });

    // Test twitter Icon
    twitIcon.click();
    driver.getAllWindowHandles().then(function(tabs) {
      expect(tabs.length).to.equal(2);

      driver.switchTo().window(tabs[1]);
      expect(driver.getCurrentUrl()).to.eventually.equal("https://twitter.com/InsideHook");
      expect(driver.getTitle()).to.eventually.equal("InsideHook (@InsideHook) | Twitter");
      driver.close(); driver.switchTo().window(tabs[0]);
    });

  });

}