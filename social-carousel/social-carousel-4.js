var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    socialCarousel3 = require('./social-carousel-3.js');
chai.use(require('chai-as-promised'));
    
exports.itemSize = function(driver) {

	// get items from social carousel
	var slickItems = socialCarousel3.carouselItemsDisplay(driver);
  
  slickItems.then(function(items) {
    expect(items.length).to.equal(18); // 10 items + 8 clones

    // skip first annd last four clones
    for (i=4; i<(items.length-4); i++) {
      items[i].getSize().then(function(size) {
        expect(size.height).to.equal(300);
        expect(size.width).to.equal(300);
      });
    }
  });

}
