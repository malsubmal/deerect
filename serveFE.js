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

// Mock database
var users = [{
    user: "publisher1",
    pass: "pass"
}, {
    user: "publisher2",
    pass: "pass"
}, {
    user: "subscriber",
    pass: "pass"
}];

// Login
app.post('/api-login/login', function (req, res) {

    // Retrieve params from POST body
    var user = req.body.user;
    var pass = req.body.pass;
    console.log("Logging in | {user, pass}={" + user + ", " + pass + "}");

    if (login(user, pass)) { // Correct user-pass
        // Validate session and return OK
        // Value stored in req.session allows us to identify the user in future requests
        console.log("'" + user + "' has logged in");
        req.session.loggedUser = user;
        console.log(req.session);
        res.status(200).send();
    } else { // Wrong user-pass
        // Invalidate session and return error
        console.log("'" + user + "' invalid credentials");
        req.session.destroy();
        res.status(401).send('User/Pass incorrect');
    }
});

// Logout
app.post('/api-login/logout', function (req, res) {
    console.log("'" + req.session.loggedUser + "' has logged out");
    req.session.destroy();
    res.status(200).send();
});


function login(user, pass) {
    return (users.find(u => (u.user === user) && (u.pass === pass)));
}

https.createServer(options, app).listen(5002);