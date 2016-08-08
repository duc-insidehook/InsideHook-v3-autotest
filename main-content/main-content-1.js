/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));


/**
 *	Header and social icons appear as expected
 *	- header incldues h1, h2, h4
 *	- social buttons block display
 */
exports.headerAndSocial = function(driver) {

  // header incldues h1, h2, h4
	var masthead = driver.findElement(webdriver.By.css(".art-masthead"));
	masthead.getInnerHtml().then(function(masthead) {
		expect(masthead).to.have.string('<h1').
										and.have.string('<h2').
										and.have.string('<h4');
	});

  // Social buttons block
	socialBlock = masthead.findElement(webdriver.By.css(".brand-social-buttons"));

  return socialBlock;

}
