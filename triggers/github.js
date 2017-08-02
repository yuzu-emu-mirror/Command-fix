var request = require('request');
var app = require('../app.js');
var logger = require('../logging.js');

var regex = /[^\<\\]\#(\d+)/ig;

exports.trigger = function(message) {
  return new RegExp(regex).test(message.content);
}

exports.execute = function(message) {
  let matcher = new RegExp(regex);
  let match = matcher.exec(message.content);
  let matched = [];

  while(match != null) {
    if(matched.indexOf(match[1]) == -1) {
      matched.push(match[1]);
    } else {
      match = matcher.exec(message.content);
      continue;
    }

    let url = `https://github.com/citra-emu/citra/pull/${match[1]}`;
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        message.channel.sendMessage(`Github Pull Request: ${url}`);
      }
    });

    match = matcher.exec(message.content);
  }
}
