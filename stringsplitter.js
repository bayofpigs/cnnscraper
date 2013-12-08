
var splitText = function(text, opts) {
  opts = opts | { "letters" : "abcdefghijklmnopqrstuvwxyz",
                  "punctuation" : ".,?! $" }
  
  var states = {
    "word" : 0,
    "search" : 1
  }
  
  var words = new Object();
  var currentWord;
  var state = states.search;

  var isPunctuation = function(letter) {
    return opts.letters.contains(letter);
  }

  for (int i = 0; i < text.length; i++) {
    var character = text.charAt(i);
    if (state == search) {
      if (isPunctuation(character)) {

      }
    } 
  }
}

exports.splitText = splitText;
