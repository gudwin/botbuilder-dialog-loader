# botbuilder-dialog-loader
A Library that helps to autload Microsoft Bot Framework dialogs. Autoloads dialogs from provided folder, 
able to pass custom arguments for dialogs. It is supposed that every javascript file 
in the folder will expose only function with bot as first argument.
**Recommendation**: match dialog id's with the dialog folder structure.
   
Please do not hesitate to ask or publish your proposals. 

# Loader arguments 
So `require('botbuilder-dialog-loader')` will return a function that requires next arguments:
. **bot** - a [UniversalBot](https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.universalbot.html) instance;
. **basePath** - a path to dialogs folder;
. **config** - (optional) could be a _function_ or an object.
  . If function passed, than the Library will call it with every loaded javascript module. Callback arguments: relative filename, _exports_ section of the loaded module;
  . If an object passed, than the Library will interprete keys in the object as names of folders and files. Attribute values will be passed as an arguments to loaded files, in case if filename (with directory name) matches to a key i _config_ object. Example of such object:
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

Please take a look on **example** folder in repository.  

# Installation 

```
    npm install --save botbuilder-dialog-loader
```
