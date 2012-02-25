var types = {
    '.txt': 'text/plain',
    '.css': 'text/css',
    '.html': 'text/html',
    '.htm': 'text/html',
    
    '.ico': 'image/x-icon',
    '.png': 'image/png',
    '.gif': 'image/gif'
    
};

exports.getMIMEType = function (extention){
    var mimeType = types[extention];
    if (mimeType == undefined || mimeType == null){
        return types['.txt'];
    }
    return mimeType;
};
