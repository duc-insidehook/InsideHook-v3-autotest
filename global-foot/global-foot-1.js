/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));

// Prerequisite Test
var globalFoot0 = require('./global-foot-0.js');


/**
 *  InsideHook elsewhere
 *	- retrieve footer elements
 *	- expect correct tittle and 5 (social) links
 *	- click on a random link
 */
exports.elsewhere = function(driver) {
  
  // retrieve footer Elements
  var footerElements = globalFoot0.footerElements(driver);
  // elsewhere, theBasics, collections, essentials

  var elsewhere = footerElements[0];
  var title = elsewhere.findElement(webdriver.By.css("dt h6"));
  var links = elsewhere.findElements(webdriver.By.css("dd a"));

  // expect correct title and 5 (social) links
  expect(title.getText()).to.eventually.equal("US, ELSEWHERE");
  links.then(function(links) {
  	expect(links.length, "there are different than 5 links under \"US, ELSEWHERE\"").
  		to.equal(5);

  	// click on a random link
  	var index = Math.floor(Math.random() * links.length);
  	links[index].getText().then(function(linkText) {
  		links[index].click(); driver.sleep(1000);

  		driver.getAllWindowHandles().then(function(tabs) {
	      expect(tabs.length, "link cannot be clicked/ will not opened").
	        to.equal(2);

	      driver.switchTo().window(tabs[1]);
	      switch(linkText) {
	      	case "FACEBOOK":
	      		expect(driver.getCurrentUrl()).to.eventually.equal("https://www.facebook.com/InsideHook/");
      			expect(driver.getTitle()).to.eventually.equal("InsideHook | Facebook");
      			break;
      		case "INSTAGRAM":
	      		expect(driver.getCurrentUrl()).to.eventually.equal("https://www.instagram.com/insidehook/");
      			expect(driver.getTitle()).to.eventually.equal("InsideHook (@insidehook) • Instagram photos and videos");
      			break;
      		case "TWITTER":
      			expect(driver.getCurrentUrl()).to.eventually.equal("https://twitter.com/insidehook");
      			expect(driver.getTitle()).to.eventually.equal("InsideHook (@InsideHook) | Twitter");
      			break;
      		case "LINKEDIN":
      			expect(driver.getCurrentUrl()).to.eventually.equal("https://www.linkedin.com/company/insidehook");
      			expect(driver.getTitle()).to.eventually.equal("InsideHook | LinkedIn");
      			break;
      		case "NEWSLETTER":
      			expect(driver.getCurrentUrl()).to.eventually.equal("http://c.insidehook.com/joinfree");
      			expect(driver.getTitle()).to.eventually.equal("Sign Up For InsideHook | InsideHook");
      			break;
      		default:
      			console.log("Err: unrecognized link");
	      }
	      
	      driver.close(); driver.switchTo().window(tabs[0]);
	    });
  	}); 
  });

};
