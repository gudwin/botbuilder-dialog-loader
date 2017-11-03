const fs = require('fs');
const path = require('path');

module.exports = function (bot, basePath, config) {
  const getSubMapper = function ( baseMapper, subItem) {
    let isFunction = "function" === typeof baseMapper;
    if ( isFunction) {
      return baseMapper;
    } else {
      return "undefined" != typeof baseMapper[subItem] ? baseMapper[subItem] : [];
    }
  }
  const loadFile = function (path, mapper,bot,relativePath ) {
    let contents = require( path );
    if ( "object" == typeof mapper) {
      if ( "function" == typeof contents ) {
        let arguments = [bot].concat(mapper);
        contents.apply( null, arguments);
      }
    } else {
      mapper.call(this,bot, relativePath, contents);
    }
  }
  const loadJsFiles = function ( basePath, mapper, relativePath ) {
    let files = fs.readdirSync( basePath );
    files.forEach( function ( src ) {
      let stat = fs.statSync( basePath  + src );
      let parse = path.parse( basePath + src);
      let newMapper = getSubMapper( mapper, parse.name);
      if ( stat.isDirectory() ){
        loadJsFiles( basePath + src + '/',  newMapper, relativePath + src + '/');
      } else {
        let pathInfo = path.parse( basePath + src );
        let isExtensionSupported = ['.js','.json'].indexOf( pathInfo.ext) > -1;
        if ( isExtensionSupported ) {
          loadFile(basePath + src, newMapper,bot,relativePath + pathInfo.name);
        }
      }
    })
  }


  let  isValid = ( "object" == typeof config ) || ( "function" == typeof config );
  if (!isValid ) {
    config = {};
  }

  loadJsFiles( basePath, config,'/' );
}