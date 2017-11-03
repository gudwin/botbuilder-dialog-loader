const botbuilder = require('botbuilder');
const path = require('path');
const loader = require('../botbuilder-dialog-loader');

let connector = new botbuilder.ConsoleConnector().listen();
let bot = new botbuilder.UniversalBot(connector);
const FACTORIES_PATH = path.dirname(__filename) + '/dialog-factories/';
const CONFIGURATIONS_PATH = path.dirname(__filename) + '/dialog-configs/';

bot.dialog('/', function ( session ) {
  session.beginDialog( '/welcome');
})
loader( bot, FACTORIES_PATH, {
  "welcome" : ["DialogLoader"]
});
loader( bot, CONFIGURATIONS_PATH,function ( bot, path, response ) {
  console.log(path);
  bot.dialog(path,function (session ) {
    response.forEach(item => session.send(item));
    session.endDialog();
  });
})

console.log('Press any key...');