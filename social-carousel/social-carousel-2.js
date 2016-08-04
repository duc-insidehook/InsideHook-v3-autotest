var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    socialCarousel1 = require('./social-carousel-1.js');
chai.use(require('chai-as-promised'));
    
exports.socialIcons = function(driver, rawTemplate) {

  if( rawTemplate=='main-category') {
    console.log('\t- the test bellow is not applicable on this template');
  } else { // home template

  	// wait for the small carousel to appear
  	var socialSection = socialCarousel1.appear(driver);

  	// find all social buttons on social section
    // social icons are expected to be listed in this order: fb, gram, twitter
    var socialIcons = socialSection.findElements(webdriver.By.css(".brand-social-buttons .button"));
    socialIcons.then(function(socialIcons) {
      var fbIcon = socialIcons[0];
      var gramIcon = socialIcons[1];
      var twitIcon = socialIcons[2];

      // Test href Attribute
      expect(fbIcon.getAttribute('href')).to.eventually.equal('https://www.facebook.com/InsideHook');
      expect(gramIcon.getAttribute('href')).to.eventually.equal('http://instagram.com/insidehook');
      expect(twitIcon.getAttribute('href')).to.eventually.equal('https://twitter.com/#!/InsideHook');
      
      // Test fb Icon
      fbIcon.sendKeys(webdriver.Key.ESCAPE); // need for firefox, optional for chrome  
      fbIcon.click(); driver.sleep(1000);
      driver.getAllWindowHandles().then(function(tabs) {
        expect(tabs.length).to.equal(2);

        driver.switchTo().window(tabs[1]);
        expect(driver.getCurrentUrl()).to.eventually.equal("https://www.facebook.com/InsideHook");
        expect(driver.getTitle()).to.eventually.equal("InsideHook | Facebook");
        driver.close(); driver.switchTo().window(tabs[0]);
      });

      // Test gram Icon
      gramIcon.click(); driver.sleep(1000);
      driver.getAllWindowHandles().then(function(tabs) {
        expect(tabs.length).to.equal(2);

        driver.switchTo().window(tabs[1]);
        expect(driver.getCurrentUrl()).to.eventually.equal("https://www.instagram.com/insidehook/");
        expect(driver.getTitle()).to.eventually.equal("InsideHook (@insidehook) • Instagram photos and videos");
        driver.close(); driver.switchTo().window(tabs[0]);
      });

      // Test twitter Icon
      twitIcon.click(); driver.sleep(1000);
      driver.getAllWindowHandles().then(function(tabs) {
        expect(tabs.length).to.equal(2);

        driver.switchTo().window(tabs[1]);
        expect(driver.getCurrentUrl()).to.eventually.equal("https://twitter.com/InsideHook");
        expect(driver.getTitle()).to.eventually.equal("InsideHook (@InsideHook) | Twitter");
        driver.close(); driver.switchTo().window(tabs[0]);
      });

    });
  }
}
