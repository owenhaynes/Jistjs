/*
 * 
 *  Jist.js
 *  A Webserver for Node.js
 *  
 *  (c)owenhaynes.com 2012
 * 
 */

var types = {
    //Text Types
    '.txt': 'text/plain',
    '.css': 'text/css',
    '.html': 'text/html',
    '.htm': 'text/html',
    
    //Application Types
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.xml': 'application/xml',
    '.pdf': 'application/pdf',
    
    //Image Types
    '.ico': 'image/x-icon',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml'
    
};

exports.getMIMEType = function (extention){
    var mimeType = types[extention];
    if (mimeType == undefined || mimeType == null){
        return types['.txt'];
    }
    return mimeType;
};
