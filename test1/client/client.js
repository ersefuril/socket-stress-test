/**
 * Created by RC on 27/12/2014.
 */
var fs = require('fs');

// Config
var nbClient = 5;
var heartbeatInterval = 10;

// Constants
var nbMessageToReceive = 1;

// Messages, Timer and stats variables
var connections = 0;
var intervalID;
var messages = [];
var nbReceivedMessage = 0;
var time = new Date();
var statsFile = 'test1/stats/bench.txt';


var makeConnection = function() {
    var io = require('socket.io-client')('http://127.0.0.1:3001', { forceNew: true });

    io.on('message', function (message) {
       handleMessage(io, message);
    });

    connections++;
    // When all client are created, start benchmark
    if (connections == nbClient) {
        clearInterval(intervalID);
        start(io);
    }
};

var start = function (io) {
    console.log('* Sending start message to server...')
    io.emit('start', nbMessageToReceive);
};

var handleMessage = function(io, message) {
    nbReceivedMessage++;
    message.id = io.io.engine.id;
    messages.push(message);

    // When all messages have been received, write them into bench file
    if(nbReceivedMessage == nbMessageToReceive * nbClient) {
        // Compute time
        var benchTime = new Date().getTime() - time.getTime();
        console.log("* End test. Time spent : " + benchTime + " ms");

        // Write received message into file
        console.log('* Writing stats data to ' + statsFile);
        var file = fs.createWriteStream(statsFile);
        file.on('error', function() { console.log("[ERROR] an error occurred during data writing"); });
        messages.forEach(function(message) {
            file.write(JSON.stringify(message) + '\n');
        });
        file.end();
    }
    io.disconnect();

};


console.log("* Reset previously generated data...");
fs.writeFile(statsFile, '', function() {
    console.log('* Creating ' + nbClient + ' client instances (time interval : ' + heartbeatInterval + ' ms) ...');
    intervalID = setInterval(makeConnection, heartbeatInterval);
});

