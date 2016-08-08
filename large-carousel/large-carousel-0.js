//	Import Modules
var webdriver = require('selenium-webdriver');


exports.getActiveSlide = function(driver) {

	var activeSlide = driver.findElement(webdriver.By.css(".fs-slick .slide.slick-slide.slick-current.slick-active"));
	return activeSlide;
};

exports.getActiveSlideText = function(driver) {

	var activeText = driver.findElement(webdriver.By.css(".fs-slick .slide.slick-slide.slick-current.slick-active .orbit-caption"));
	return activeText;
};

exports.getActiveSlideUrl = function(driver) {

	var activeLink = driver.findElement(webdriver.By.css(".fs-slick .slide.slick-slide.slick-current.slick-active a"));
	return activeLink;
};