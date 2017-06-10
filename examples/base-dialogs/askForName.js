const botbuilder = require('botbuilder');

module.exports = function (bot) {
  bot.dialog('/askForName', [function (session) {
    botbuilder.Prompts.text(session, 'What is your name?');
  }]);
}