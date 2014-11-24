var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// TODO : find a way to do something like below, to compare different transport methods
//var io = require('socket.io')(server, {
//    'transports': [
//        'websocket'
//        , 'flashsocket'
//        , 'htmlfile'
//        , 'xhr-polling'
//        , 'jsonp-polling'
//    ]
//});

var port = process.env.PORT || 3004;

app.use(express.static(__dirname + '/client'));

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

io.on('connection', function(socket) {

    socket.emit('connected');
    console.log('connected');

    socket.on('question', function() {
        socket.emit('answer');
    });

    socket.on('disconnect', function () {  });
});