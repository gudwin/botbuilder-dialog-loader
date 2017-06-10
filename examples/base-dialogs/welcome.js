module.exports = function (bot,name) {
  bot.dialog('/welcome', [function (session) {
    session.send(`My name is - ${name}`)
    session.beginDialog('/askForName')
  },
    function (session, results) {
      session.endDialog(`Hi, ${results.response}!`);
      setTimeout( function () {
        process.exit()
      },1000);
    }
  ]);
}