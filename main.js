/*
 * 
 *  Jist.js
 *  A Webserver for Node.js
 *  
 *  (c)owenhaynes.com 2012
 * 
 */
var rh = require('./core/RequestHandler.js');

var http = require('http');

// Load Settings
try{
    var settings = require('./settings.json');//.toString('utf8');
    console.log(settings.webserver)

    http.createServer(function (req, res) {
        var ps = new rh.RequestHandler(req,res);
    }).listen(settings.webserver.port, settings.webserver.host);
    console.log('Server running at http://' + settings.webserver.host + ':' + settings.webserver.port);
}catch(error){
    console.log("Unable to find settings.json.");
}