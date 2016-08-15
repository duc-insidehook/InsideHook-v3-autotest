/**
 *  Variables
 */
var argv = require('minimist')(process.argv.slice(2)),
    webdriver = require('selenium-webdriver'),
		username = "afkafkno9",
		accessKey = "b19378ff-c82a-47d0-bff3-06f960561b5f",
    driver;


/**
 *  Config-options
 *  - server, browser, template
 */
var server;
  if( (typeof argv.server) == 'object' ){
    server = argv.server[0];  
  } 
  else {  // type == 'string' --- default server
    server = argv.server;
  }
var browser;
  if( (typeof argv.browser) == 'object' ){
    browser = argv.browser[0];  
  } 
  else {  // type == 'string' --- default browser
    browser = argv.browser;
  }
var template;
  if( (typeof argv.template) == 'object' ){
    template = argv.template[0];  
  } 
  else {  // type == 'string' --- default template
    template = argv.template;
  }


/**
 *  Function that configs and returns a web driver
 */
exports.loadDriver = function() {
  
  // sample Saucelabs server
  if( server == 'saucelabs') {
    driver = new webdriver.Builder().
      withCapabilities({
        'browserName': 'chrome',
        'platform': 'MAC',
        'version': '51.0',
        'username': username,
        'accessKey': accessKey
      }).
      usingServer("http://" + username + ":" + accessKey +
                  "@ondemand.saucelabs.com:80/wd/hub").
      build();
  }

  // local server
  else if( server == 'local') {
    switch(browser) {
      case "chrome":
        driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome()).
        build();
        break;
      case "firefox":
        driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.firefox()).
        build();
        break;
      case "safari":
        driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.safari()).
        build();
        break;
      case "opera":
        driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.opera()).
        build();
        break;
      default:
        console.log("Err: Invalid Browser\n");
    }
  }

  else {
    console.log("Err: Invalid Server\n");
  }

  return driver;
}


/**
 *  Function that returns url for each test template
 */
exports.template = function() {
  switch(template) {
    case 'home': 
      return "http://www-stage.insidehook.com/";
    case 'main-category':
      return "http://www-stage.insidehook.com/new-york/what-to-buy/";
    case 'sub-category':
      return "http://www-stage.insidehook.com/new-york/apps/";
    case 'featured':
      return "http://www.insidehook.com/nation/monaco-boat-services-hall-of-vintage-yachts-look-like-formula-1-racers/";
    case 'goods':
      return "http://www-stage.insidehook.com/nation/goods/";
    default:
      console.log("Err: Invalid Template\n");
      return null;
  }
}


/**
 *  Function that returns only the template's name
 */
exports.rawTemplate = function() {

  return template;
}
