/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));

// Prerequisite Test
var socialCarousel1 = require('./social-carousel-1.js');


/**
 *  Social icons click through to appropriate destination
 *  - retrieve social section 
 *  - click on each social icon
 */
exports.socialIcons = function(driver, rawTemplate) {

  if( rawTemplate=='main-category') {
    console.log('\t- the test bellow is not applicable on this template');
  } 
  else { // home template

  	// retrieve social section 
  	var socialSection = socialCarousel1.appear(driver);
    var socialIcons = socialSection.findElements(webdriver.By.css(".brand-social-buttons .button"));
    socialIcons.then(function(socialIcons) {
      expect(socialIcons.length, "section does not have 3 social icons").
        to.equal(3);
      
      // social icons are expected to be listed in this order: fb, gram, twitter
      var fbIcon = socialIcons[0],
          gramIcon = socialIcons[1],
          twitIcon = socialIcons[2];

      // Test href Attribute
      expect(fbIcon.getAttribute('href')).to.eventually.equal('https://www.facebook.com/InsideHook');
      expect(gramIcon.getAttribute('href')).to.eventually.equal('http://instagram.com/insidehook');
      expect(twitIcon.getAttribute('href')).to.eventually.equal('https://twitter.com/#!/InsideHook');
      
      // Test fb Icon
      fbIcon.sendKeys(webdriver.Key.ESCAPE); // need for firefox, optional for chrome  
      fbIcon.click(); driver.sleep(1000);
      driver.getAllWindowHandles().then(function(tabs) {
        expect(tabs.length, "fbIcon cannot be clicked/ will not opened").
          to.equal(2);

        driver.switchTo().window(tabs[1]);
        expect(driver.getCurrentUrl()).to.eventually.equal("https://www.facebook.com/InsideHook");
        expect(driver.getTitle()).to.eventually.equal("InsideHook | Facebook");
        driver.close(); driver.switchTo().window(tabs[0]);
      });

      // Test gram Icon
      gramIcon.click(); driver.sleep(1000);
      driver.getAllWindowHandles().then(function(tabs) {
        expect(tabs.length, "gramIcon cannot be clicked/ will not opened").
          to.equal(2);

        driver.switchTo().window(tabs[1]);
        expect(driver.getCurrentUrl()).to.eventually.equal("https://www.instagram.com/insidehook/");
        expect(driver.getTitle()).to.eventually.equal("InsideHook (@insidehook) • Instagram photos and videos");
        driver.close(); driver.switchTo().window(tabs[0]);
      });

      // Test twitter Icon
      twitIcon.click(); driver.sleep(1000);
      driver.getAllWindowHandles().then(function(tabs) {
        expect(tabs.length, "twitIcon cannot be clicked/ will not opened").
          to.equal(2);

        driver.switchTo().window(tabs[1]);
        expect(driver.getCurrentUrl()).to.eventually.equal("https://twitter.com/InsideHook");
        expect(driver.getTitle()).to.eventually.equal("InsideHook (@InsideHook) | Twitter");
        driver.close(); driver.switchTo().window(tabs[0]);
      });

    });
  }
}
