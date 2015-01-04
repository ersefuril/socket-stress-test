var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/client'));

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

var clients = [];

io.on('connection', function(socket) {

    clients.push(socket.id);

    socket.on('start', function(nbMessage) {
        console.log("*** Start Test ***");
        console.log("* Broadcast " + nbMessage + " messages to " + clients.length + " clients");
        var i;
        for(i = 0; i < nbMessage; i++) {
            console.log('* Broadcast message ' + i);
            io.emit('message', {msg: 'message ' + i, isEnd: (i == (nbMessage - 1)) });
        }
    });

    socket.on('disconnect', function() {
        console.log('client disconnected : ' + socket.id);
        clients.splice(clients.indexOf(socket.id),1);
        console.log('nb remaining clients (without the main socket) : ' + (clients.length - 1));
    });

    /*
    socket.on('question', function() {
        socket.emit('answer');
    });
    */
});