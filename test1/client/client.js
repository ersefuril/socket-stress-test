/**
 * Created by RC on 27/12/2014.
 */
var fs = require('fs');
var io = require('socket.io-client')('http://localhost:3001');

// Timer variables
var heartbeatInterval = 2 * 1000;
var idx = 0;
var intervalID;

// Messages and stats variables
var messages = [];
var nbReceivedMessage = 0;

// Get program arguments
var args = process.argv.splice(2);
var nbClient = args[0];
var nbMessageToReceive = args[1];

console.log('* Creating ' + nbClient + ' client instances...');

var makeConnection = function() {
    console.log("new client");
    io.connect('http://localhost:3001', { 'force new connection' : true });

    io.on('message', function (message) {
       handleMessage(io, message);
    });

    idx++;
    if (idx == nbClient) {
        clearInterval(intervalID);
        start(io);
    }
};

var start = function (io) {
    console.log('* Sending start message to server...')
    io.emit('start', nbMessageToReceive);
    //io.disconnect();
};

var handleMessage = function(io, message) {
    console.log("* Client has received a message : " + message);
    nbReceivedMessage++;
    messages.push({'qzdq': io.id, 'message': message});

    if(nbReceivedMessage == nbMessageToReceive * nbClient) {
        var statsFile = 'test1/stats/bench.txt';
        console.log('* Writing stats data to ' + statsFile);
        fs.writeFile(statsFile, JSON.stringify(messages));
    }
    io.disconnect();
}

intervalID = setInterval(makeConnection, heartbeatInterval/nbClient);