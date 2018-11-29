// include dependencies
var express = require('express')
var proxy = require('http-proxy-middleware')

var rootPath = 'http://192.168.1.79';
var port = 80;
// proxy middleware rootProxy
var rootProxy = {
    target : rootPath, // target host
    ws     : true, // proxy websockets
    router :{}
}
rootProxy.router['voffcon.localhost:'+port]=rootPath+':6100';
rootProxy.router['parts.localhost:'+port]=rootPath+':6300';
rootProxy.router['voffcon.guttih.com:'+port]=rootPath+':6100';
rootProxy.router['parts.guttih.com:'+port]=rootPath+':6300';


var rootProxy = proxy(rootProxy)

var app = express()
app.use('/', rootProxy);


app.use('/public', rootProxy);

app.listen(port, function (){
    console.log('listening at port '+port);
});


 
 
 
 
 
 /*var proxyServer = require('http-route-proxy');
 


proxyServer.proxy([
    // common config
    {
        // origin host + port
        from: 'localhost:9000/parts',
        // forward host + port
        to: '192.168.1.79:6300',
        // match forward action rule
        // `"/"` means forward match all actions, 
        // `!/public` means match local static forward match `/public.*`
        route: ['/', '!/public']
    }
]);


proxyServer.proxy([
    // common config
    {
        // origin host + port
        from: 'localhost:9000',
        // forward host + port
        to: '192.168.1.79:6100',
        // match forward action rule
        // `"/"` means forward match all actions, 
        // `!/public` means match local static forward match `/public.*`
        route: ['/', '!/public']
    }
]);*/