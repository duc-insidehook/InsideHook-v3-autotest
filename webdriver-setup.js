/**
 *  Variables
 */
var argv = require('minimist')(process.argv.slice(2)),
    webdriver = require('selenium-webdriver'),
		username = "afkafkno9",
		accessKey = "b19378ff-c82a-47d0-bff3-06f960561b5f",
    driver;


/**
 *  Function that configs and returns a web driver
 */
exports.loadDriver = function() {
  
  // sample Saucelabs server
  if( argv.server == 'saucelabs') {
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
  else {  
    if( argv.browser == 'firefox') {
      driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.firefox()).
        build();
    }
    else if( argv.browser == 'safari') {
      var driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.safari()).
        build();
    }
    else if( argv.browser == 'opera') {
      var driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.opera()).
        build();
    }
    else {  // chrome
      var driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome()).
        build();
    }
  }

  return driver;
}


/**
 *  Function that returns url for each test template
 */
exports.template = function() {

  if( argv.template == 'sub-category') {
    return "http://www-stage.insidehook.com/new-york/apps/";
  }
  else if( argv.template == 'main-category') {
    return "http://www-stage.insidehook.com/new-york/what-to-buy/";
  }
  else if( argv.template == 'featured') {
    return "http://www-stage.insidehook.com/nation/mclarens-one-off-570s-formula-1-tribute-is-a-piece/";
  }
  else { // home
    return  "http://www-stage.insidehook.com/";
  }
}


/**
 *  Function that returns only the template's name
 */
exports.rawTemplate = function() {

  return argv.template;
}
