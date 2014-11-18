var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/client'));

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

io.on('connection', function(socket) {

    socket.on('start', function(nbMessage) {
        console.log("");
        console.log("*** Start Test ***");
        console.log("* Broadcast " + nbMessage + " messages");
        var i;
        for(i = 0; i < nbMessage; i++) {
            io.emit('message');
        }

    });

    socket.on('disconnect', function() {  });

    /*
    socket.on('question', function() {
        socket.emit('answer');
    });
    */


});