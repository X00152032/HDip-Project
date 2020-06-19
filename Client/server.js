//X00152032 - Robert Cummins
// This creates a HTTP server using Javascript

//Uses the http module to create a server
const http = require('http');

//Listen on http://localhost:3000
const hostname = '127.0.0.1';
const port = 3000;

//my Azure Web app is at https://x00152032.azurewebsites.net


//define the server - so that it accepts a request and sends a response
const server = http.createServer((req, res) => {

    //200 OK Response
    res.statusCode = 200;

    //Define context type
    res.setHeader('Content-Type', 'text/html');

    //The response content
    res.end('<h1 style="color:red;">Hello World!</h1><h2 style="color:blue;">It is working so far</h2>'); 
});

//Run the HTTP server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

//Ctrl + C to stop server