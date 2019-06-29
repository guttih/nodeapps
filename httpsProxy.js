// include dependencies
const fs = require('fs');
var express = require('express')
var proxy = require('http-proxy-middleware')
const https = require('https');

var app = express();

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/guttih.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/guttih.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/guttih.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

var options = {
  target: 'https://localhost:6010', // target host the root page
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
   router: {
    // when 'parts.guttih.com' == 'http://localhost:6300',
    // override target 'http://localhost:6000' to 'http://localhost:6300'
	'parts.guttih.com': 'https://localhost:6310',
  	'voff.guttih.com' : 'https://localhost:6110',
	'guttih.com:9999' : 'https://localhost:6010'
  }
,logLevel: 'debug'
}

// create the proxy (without context)
var rootProxy = proxy(options)

// mount `rootProxy` in web server

app.use('/', rootProxy)


var portHttps=443;

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(portHttps/*443*/, () => {
	console.log('HTTPS server listening on port '+portHttps);
});

