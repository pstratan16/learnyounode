var http = require('http');
var url = require('url');
var portNumber = process.argv[2];

var routes = {
    "/api/parsetime": function(parseUrl){
        var date = new Date(parseUrl.query.iso);
        return {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        };
    },
    "/api/unixtime": function(parseUrl){
        return {
            unixtime: (new Date(parseUrl.query.iso)).getTime()
        };
    }
};

var server = http.createServer(function(req, res){
    var parsedUrl = url.parse(req.url, true);
    var resource = routes[parsedUrl.pathname];
    
    if(resource){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(resource(parsedUrl)));
    }
    else{
        res.writeHead(404);
        res.end();
    }
});
server.listen(portNumber);
