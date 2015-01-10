var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3002;
app.use(express.static(__dirname + '/client'));

// Config
var heartbeatInterval = 10;

// Messages, Timer and stats variables
var sentMessages = 0;
var intervalID;
var clients = [];

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

io.on('connection', function(socket) {
    clients.push(socket.id);

    socket.on('start', function(nbMessage) {
        console.log("* Number of connected clients : " + clients.length);
        console.log('* Starting test : broadcast ' + nbMessage + ' messages (time interval : ' +  heartbeatInterval + ' ms)');

        intervalID = setInterval(function() { sendMessage(nbMessage); }, heartbeatInterval);
    });

    socket.on('disconnect', function() {  });

});

var sendMessage = function(nbMessage) {
    io.emit('message', { id:'', content: 'Hello from server !'});
    sentMessages++;

    if (sentMessages == nbMessage) {
        console.log('* Stopping test');
        clearInterval(intervalID);
        sentMessages = 0;
        clients = [];
    }
};