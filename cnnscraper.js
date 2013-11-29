var request = require("request");
var cheerio = require("cheerio");
var linkUrl = "http://www.cnn.com";
var linkUrlObjects = [];

// Kind of hack-ey. probs not the right way to do this
// whatevs. #yoloswagprogramming
var finalCallback;
var processed;
var toBeProcessed;

var handleHomeRequest = function(error, response, body) {
  var $ = cheerio.load(body);
  var links = [];
  $("a").each(
    function() {
      var link = $(this);
      var href = link.attr("href");

      if (isLink(href)) { 
        if (indexOf(href, links) === -1) links.push(href);
      }
    }
  );
  toBeProcessed = links.length;

  for (var i = 0; i < links.length; i++) {
    console.log(links[i]);
    makeLinkRequest(links[i]);
  }
}

var indexOf = function(item, container) {
  for (var i = 0; i < container.length; i++) {
    if (container[i] === item) {
      return i;
    }
  }

  return -1;
}

var isLink = function(toCheck) {
  return /^\/\d+\//.test(toCheck);
}

var makeLinkRequest = function(link) {
  var homeUrl = "http://www.cnn.com";
  var linkUrl = homeUrl + link;

  request({
    url: linkUrl
  }, processUrl);
}

var processUrl = function (error, response, body) {
  //console.log(body);
  var titleSelector = ".cnn_storyarea h1";
  var articleSelector = ".cnn_storyarea p";

  var $ = cheerio.load(body);  
  var title = $(titleSelector).text();
  
  var body = "";
  $(articleSelector).each(
    function() {
      var element = $(this);
      var content = element.text();

      body += content + "\n";
    }
  );
  
  var newObject = new Object();
  newObject.title = title;
  newObject.body = body;

  linkUrlObjects.push(newObject);
  //console.log(title);
  //console.log(body);
  
  processed++;
  console.log(processed + " " + toBeProcessed);

  if (processed == toBeProcessed) callCallback();
} 

var callCallback = function() {
  finalCallback(linkUrlObjects);
}

var getCNNData = function(callback) {
  processed = 0;
  request({
    url: linkUrl
  }, handleHomeRequest);

  finalCallback = callback; 
}

exports.getData = getCNNData;
