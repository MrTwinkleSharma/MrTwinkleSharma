const expressApp = require('./app');
const { createServer } = require('http');

createServer(expressApp)
    .listen(3001, (req, res) => {
        console.log("Server Listening");
    });