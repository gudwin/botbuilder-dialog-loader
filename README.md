# botbuilder-dialog-loader
A Library that helps to autload Microsoft Bot Framework dialogs. Autoloads dialogs from provided folder, 
able to pass custom arguments for dialogs. It is supposed that every javascript file 
in the folder will expose only function with bot as first argument.
**Recommendation****: match dialog id's with the dialog folder structure.   

# Loader arguments 
So `require('botbuilder-dialog-loader')` will return a function that requires next arguments:
. **bot** - a [UniversalBot](https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.universalbot.html) instance;
. **basePath** - a path to dialogs folder;
. **config** - (optional) a configuration object. Every object's key reflects to 
a folder or to a concrete javascript file (without extension). Key's value 
should contain or an object (in case of folder) or an array of arguments, 
that will be passed to thefile. Example:
```javascript
 {
    "folderA" : {
        "folderB" : {
           "some_dialogs" : [arg1, ..., argN] // A
        }
    },
    "welcome" : ["Hello", "Wolrd!"]
 }
```

# Usage Example

1. Create a folder - `/src/dialogs`;
2. Create a file - `/src/dialogs/welcome.js`;
3. Place next code into the `welcome.js`:
```javascript
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
```
4. Create a file - `/src/dialogs/askForName.js`;
5. Place next code into the `askForName.js`:
```javascript
const botbuilder = require('botbuilder');

module.exports = function (bot) {
  bot.dialog('/askForName', [function (session) {
    botbuilder.Prompts.text(session, 'What is your name?');
  }]);
}
```
6. Create `index.js`, a Code:
```javascript
const botbuilder = require('botbuilder');
const path = require('path');
const loader = require('botbuilder-dialog-loader');

let connector = new botbuilder.ConsoleConnector().listen();
let bot = new botbuilder.UniversalBot(connector);
let basePath = path.dirname(__filename) + '/src/dialogs/';

bot.dialog('/', function ( session ) {
  session.beginDialog( '/welcome');
})
loader( bot, basePath, {
  "welcome" : ["DialogLoader"]
});

console.log('Press any key...');
```

# Installation 

```
    npm install --save botbuilder-dialog-loader
```
