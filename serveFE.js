// Node imports
var express = require('express');
var fs = require('fs');
var session = require('cookie-session');
var cookieParser = require('cookie-parser');
var https = require('https');
var bodyParser = require('body-parser'); // Pull information from HTML POST (express4)
var app = express(); // Create our app with express
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
// Server configuration
app.use(cookieParser());
app.use(session({
    secret: 'MY_SECRET',
    secure: true
}));
app.use(express.static(__dirname + '/public')); // Set the static files location
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // Parse application/vnd.api+json as json

// Listen (start app with node server.js)
var options = {
    key: fs.readFileSync('openvidukey.pem'),
    cert: fs.readFileSync('openviducert.pem')
};

//check if user has logged in first

https.createServer(options, app).listen(5001);