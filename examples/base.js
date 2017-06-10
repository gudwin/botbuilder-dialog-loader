const botbuilder = require('botbuilder');
const path = require('path');
const loader = require('../botbuilder-dialog-loader');

let connector = new botbuilder.ConsoleConnector().listen();
let bot = new botbuilder.UniversalBot(connector);
let basePath = path.dirname(__filename) + '/base-dialogs/';

bot.dialog('/', function ( session ) {
  session.beginDialog( '/welcome');
})
loader( bot, basePath, {
  "welcome" : ["DialogLoader"]
});

console.log('Press any key...');