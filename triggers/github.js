var app = require('../app.js');
var logger = require('../logging.js');

var regex = /\#\d./;

exports.trigger = function(message) {
  return regex.test(message.content);
}

exports.execute = function(message) {
  var match = regex.exec(message.content);
  if (match) {
    var msg = `Github Pull Request: https://github.com/citra-emu/citra/pull/${match[0].substring(1).trim()}`;
    message.channel.sendMessage(msg);
  }
}
