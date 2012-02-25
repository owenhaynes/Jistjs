/*
 * 
 *  Jist.js
 *  A Webserver for Node.js
 *  
 *  (c)owenhaynes.com 2012
 * 
 */
var MimeTypes = require('./MimeTypes.js');
var FileHandler = require('./FileHandler.js');

var nURL = require('url');
var nFS = require('fs');

var HTTPHeaders = function(response,statusCode,mimeType){
    response.writeHead(statusCode,{
        'Content-Type':mimeType,
        'Server':"Test Server",
        'Date':new Date().toLocaleString()
    });
};


exports.RequestHandler = function(request,response){
    FileHandler.FileHandler(request,response,function(error,mimeType,data){
        if(!error){
            HTTPHeaders(response,200,mimeType);
            response.end(data);
        }else{
            nFS.readFile('./core/static/404.html',function(error,data){
                if(error){
                    HTTPHeaders(response,505,MimeTypes.getMIMEType('.html'));
                    response.end("505 - System Error");
                }else{
                    HTTPHeaders(response,404,MimeTypes.getMIMEType('.html'));
                    response.end(data);
                    console.log("Error 404:" + request.url);
                }
            });
        }
    });
};
