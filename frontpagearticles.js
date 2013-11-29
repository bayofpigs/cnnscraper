var cnn = require('./cnnscraper.js');
var express = require('express');
var app = express();
var mustache = require('mustache');
var template = "{{#articles}} <h1>{{title}}</h1> <p>{{body}}</p>{{/articles}}"

var printData = function(data) {
  console.log(data);
}

//cnn.getData(printData);

app.get('/', function(req, res) {
  //res.send("<h1>Fetching CNN data</h1>"); 
  var publishData = function(data) {
    var art = {
      articles: data
    }

    var html = mustache.render(template, art);
    res.send(html);
  }

  cnn.getData(publishData);
});

app.listen(3000);
