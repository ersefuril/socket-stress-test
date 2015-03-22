var express = require('express');
var app = express();

app.all('/message', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

/* TODO : JSON conf */
var MESSAGE = {
    test: 'test',
    test1: ['test'],
    test2: {
        test: ['test']
    }
};

var nbMessagesReceived = 0, nbClients = 10, nbMessages = 10, interval = 10000, isEmitter = false;

app.get('/message', function (req, res) {
    if (nbMessagesReceived == 0) {
        console.log('Start time : ' + new Date());
    }
    nbMessagesReceived++;
    if (nbMessagesReceived == (nbMessages * nbClients)) {
        console.log('End time : ' + new Date());
    }

    setTimeout(function() {
        MESSAGE.id = Math.floor(Math.random() * 1000000);
        res.send(MESSAGE);
    }, interval);
});

app.post('/message', function (req, res) {
    if (nbMessagesReceived == 0) {
        console.log('Start time : ' + new Date());
    }
    nbMessagesReceived++;
    if (nbMessagesReceived == (nbMessages * nbClients)) {
        console.log('End time : ' + new Date());
    }
    res.send();
});

var server = app.listen(4001, function () {
});