// include dependencies
const fs      = require('fs');
const express = require('express');
const helmet  = require('helmet');
const https = require('https');
const proxy   = require('http-proxy-middleware');

const privateKey  = fs.readFileSync('/etc/letsencrypt/live/guttih.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/guttih.com/cert.pem', 'utf8');
const ca          = fs.readFileSync('/etc/letsencrypt/live/guttih.com/chain.pem', 'utf8');
var options = {
  target: 'http://localhost:6000', // target host the root page
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
   router: {
    // when 'parts.guttih.com' == 'http://localhost:6300',
    // override target 'http://localhost:6000' to 'http://localhost:6300'
  'guttih.com'      : 'http://localhost:6000',
  'parts.guttih.com': 'http://localhost:6300',
  'voff.guttih.com' : 'http://localhost:6100',
  //'guttih.com:9999' : 'http://localhost:6000',
  }
  /*,ssl: {
    key : privateKey,
    cert: certificate,
    ca  : ca
  }*/
  //,logLevel: 'debug'
}

// create the proxy (without context)
var rootProxy = proxy(options)

// mount `rootProxy` in web server
var app = express()
app.use('/', rootProxy)
app.listen(80)
/*
sslApp = app;
sslApp.use(helmet());

https.createServer({
  key: privateKey,
  cert: certificate,
  ca: ca
  }, sslApp).listen(443);*/