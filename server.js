var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');
var express = require('express');
var app = express();

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));
app.use(cors());

// Here we require the prerender middleware that will handle requests from Search Engine crawlers
// We set the token only if we're using the Prerender.io service
app.use('/', express.static(__dirname + '/dist/'));
app.use('/', express.static(__dirname + '/sitemap/'));
app.use("/vendor", express.static(__dirname + "/dist/vendor"));
app.use("/bower_components", express.static(__dirname + "/bower_components"));
app.use("/scripts", express.static(__dirname + "/dist/scripts"));
app.use("/ressources", express.static(__dirname + "/dist/ressources"));
app.use("/assets", express.static(__dirname + "/dist/assets"));
app.use("/styles", express.static(__dirname + "/dist/styles"));
app.use("/templates", express.static(__dirname + "/dist/templates"));


// send our main angular html file if any link without dot is requested, e.g. 'http://someurl/about'
// this is our actual server side redirect, we don't send index.html when there's dot in link assuming such a request
// is for static data like .js, .css or .html
app.get('/[^\.]+$', function(req, res){
    res.set('Content-Type', 'text/html')
    	.sendfile("index.html", { root: __dirname + "/dist" });
});

app.post('/test', function(req,res){
		return res.send(200);
});

app.post('/sendQuestion', function(req,res){
	console.log(req.body);
	if (req.body.email && req.body.name && req.body.content)
		return res.send(200);
	else
		return res.send(404, error.code);
});

// SAY HELLO

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
