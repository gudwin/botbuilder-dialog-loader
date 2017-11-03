module.exports = function (bot, name) {
  bot.dialog('/welcome', [
    function (session) {
      session.beginDialog('/introduction');
    },
    function (session) {
      session.send(`My name is - ${name}`)
      session.beginDialog('/askForName')
    },
    function (session, results) {
      console.log(results);
      session.beginDialog('/seeyou');
    },
    function (session,results) {
      session.endConversation();
    }
  ]);
}