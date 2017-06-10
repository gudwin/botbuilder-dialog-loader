module.exports = function (bot, basePath, config) {

  const fs = require('fs');
  const path = require('path');

  let loadJsFiles = function ( basePath, config ) {
    let files = fs.readdirSync( basePath );
    files.forEach( function ( src ) {
      let stat = fs.statSync( basePath  + src );
      let parse = path.parse( basePath + src);

      let subConfig = "undefined" != typeof config[parse.name] ? config[parse.name] : [];
      if ( stat.isDirectory() ){
        loadJsFiles( basePath + src + '/',  subConfig );
      } else {

        let pathInfo = path.parse( basePath + src, subConfig );
        if ( '.js' == pathInfo.ext ) {
          let callback = require( basePath + src );
          let arguments = [bot].concat(subConfig);
          callback.apply( null, arguments);
        }
      }
    })
  }
  loadJsFiles( basePath, config );
}