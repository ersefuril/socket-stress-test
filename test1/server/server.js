var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3001;
app.use(express.static(__dirname + '/client'));

// Timer variables
var heartbeatInterval = 2 * 1000;
var idx = 0;
var intervalID;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

io.on('connection', function(socket) {
    console.log("Socket :" , socket.id);

    socket.on('start', function(nbMessage) {
        console.log('* Starting test : broadcast ' + nbMessage + ' messages');

        intervalID = setInterval(function() { sendMessage(nbMessage); }, heartbeatInterval/nbMessage);
    });

    socket.on('disconnect', function() {  });

});

var sendMessage = function(nbMessage) {
    console.log('* Sending message to clients...')
    io.emit('message', "Hello from server !");
    idx++;

    if (idx == nbMessage) {
        console.log('* Stopping test');
        clearInterval(intervalID);
        idx = 0;
    }
};