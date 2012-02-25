/*
 * 
 *  Jist.js
 *  A Webserver for Node.js
 *  
 *  (c)owenhaynes.com 2012
 * 
 */

var MimeTypes = require('./MimeTypes.js');

var nFS = require('fs');
var nURL = require('url');
var nPATH = require('path');

var generateDirIndex = function(localpath, relativePath, callback){
    nFS.readdir(localpath,function(error,files){
        if(!error){
            var filesList = '';
            for(var i=0; i<files.length; ++i)
                filesList += '<a href="' + relativePath + files[i] + '">'+files[i]+'</a><br />'
            readFile('./core/static/dirIndex.html',function(error,mimeType,data){
            data = data.toString();
            data = data.replace('{dirName}', relativePath);
            data = data.replace('{fileList}',filesList);
            callback(false,mimeType,data);
            });
        }else{
            callback(true);
        }
    }); 
};

var readFile = function(path,callback){
    var ext = nPATH.extname(path);
    var MIMETYPE = MimeTypes.getMIMEType(ext);
    nFS.readFile(path,function(error,data){
        if(error){
            callback(true);
        }else{
            callback(false,MIMETYPE, data);
        }
    });
};

/*
 *  CallBack returns the following
 *  function(error,mimetype,data)
 *
 */
exports.FileHandler = function(request,response,callback){
    var url = nURL.parse(request.url,true);
    var localPath = './www' + url.path;
    if(url.path.lastIndexOf('/') == (url.path.length-1)){
        nPATH.exists(localPath,function(exists){
           if(exists){
               //Check to see if default index exists
               var tmpPath = localPath + 'index.html';
               nPATH.exists(tmpPath,function(exists){
                   if(exists){
                       readFile(tmpPath,function(error,mimeType,data){
                           callback(error,mimeType,data);
                       });
                   }else{
                       generateDirIndex(localPath,url.path,function(error,mimeType,data){
                           callback(error,mimeType,data);
                       });
                   }
               });
           }else{
               callback(true);
           }
        });  
    }else{
        //Check the path for static resources
        var staticFile = new RegExp('^/_static');
        var match = url.path.match(staticFile);
        if(match != null){
            var p = url.path.replace('/_static','./core/static');
            readFile(p,function(error,mimeType,data){
                callback(error,mimeType,data);
            });
        }else{
            nPATH.exists(localPath,function(exists){
                if(exists){
                    readFile(localPath,function(error,mimeType,data){
                        callback(error,mimeType,data);
                    });
                }else{
                    callback(true);
                }
            });
        }
    }
};

