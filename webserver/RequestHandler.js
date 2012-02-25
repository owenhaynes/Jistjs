/* 
 *  Processes the URI query String to get to the correct location
 *  
 */
var MimeTypes = require('./MimeTypes.js');
var FileHandler = require('./FileHandler.js');

var nURL = require('url');
var nFS = require('fs');


exports.RequestHandler = function(request,response){
    FileHandler.FileHandler(request,response,function(error,mimeType,data){
        if(!error){
            response.writeHead(200, {
                'Content-Type': mimeType
            });
            response.end(data);
        }else{
            nFS.readFile('./webserver/staticfiles/404.html',function(error,data){
                if(error){
                    response.writeHead(505, {
                        'Content-Type': MimeTypes.getMIMEType('.html')
                        });
                    response.end("505 - System Error");
                }else{
                    response.writeHead(404, {
                        'Content-Type': MimeTypes.getMIMEType('.html')
                        });
                    response.end(data);
                    console.log("Error 404:" + request.url);
                }
            });
        }
    });
};
