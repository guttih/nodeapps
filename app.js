// include dependencies
var express = require('express')
var proxy = require('http-proxy-middleware')


var options = {
  target: 'http://localhost:6000', // target host the root page
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
   router: {
    // when 'parts.guttih.com' == 'http://localhost:6300',
    // override target 'http://localhost:6000' to 'http://localhost:6300'
	'parts.guttih.com': 'http://localhost:6300',
	'voff.guttih.com': 'http://localhost:6100',
  }
}

// create the proxy (without context)
var rootProxy = proxy(options)

// mount `rootProxy` in web server
var app = express()
app.use('/', rootProxy)
app.listen(80)