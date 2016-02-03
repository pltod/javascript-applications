var express = require('express');
var path = require('path');
var steps = require('./data/steps.json');

var app = express();
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use("/prod", express.static(__dirname + "/prod"));

app.get('/', function(req, res) {
    res.writeHead(301, {"Location": "index.html"});
    res.end();
});

app.get('/api/steps', function(req, res) {
	res.json(steps);
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

console.log('Server is listening on port 9999')
app.listen(9999);