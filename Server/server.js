// require = imports packages required by the application
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// my server on azure address (not working yet - problem with deployment)
//const HOST = 'https://x00152032.azurewebsites.net/';
//const PORT = 443;

const HOST = 'localhost';
const PORT = 3000;

// server is a new instance of express (web app framework)
let server = express();


var origin = [
  // my server on azure address (not working yet - problem with deployment)
    // 'https://x00152032-server.azurewebsites.net:443',
    //   'localhost:8080',
    'localhost:8080',

];

// Application settings
server.use((req, res, next) => {
    // Globally set Content-Type header for the application
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "localhost:8080");
    // my server on azure address (not working yet - problem with deployment)
   // res.setHeader("Access-Control-Allow-Origin", "https://x00152032-server.azurewebsites.net:443");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
}); 

// Allow server to support differnt body content types (using the bodyParser package)
server.use(bodyParser.text());
server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true })); // support url encoded bodies

// cors - allows browser to get data from different resources
// https://www.npmjs.com/package/cors
// https://codesquery.com/enable-cors-nodejs-express-app/
// Simple Usage (Enable All CORS Requests)
server.use(cors({ credentials: true, origin: true }));
server.options('*', cors()) // include before other routes

/* Configure server Routes to handle requests from browser */
// e.g. home page is first 
server.use('/', require('./routes/index'));
server.use('/content', require('./routes/content'));
server.use('/subject', require('./routes/subject'));
server.use('/picture', require('./routes/picture'));


// catch 404 and forward to error handler
server.use(function (req, res, next) {
    var err = new Error('Not Found: '+ req.method + ":" + req.originalUrl);
    err.status = 404;
    next(err);
});

// Start the HTTP server using HOST address and PORT consts defined above
// Listen for incoming connections
server.listen(PORT, HOST, function() {
    console.log(`Express server listening on http://${HOST}:${PORT}`);
});

// export this as a module, making the server object available when imported.
module.exports = server;