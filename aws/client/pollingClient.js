var MESSAGE_URL = 'http://localhost:4001/message';

/* TODO : JSON conf */
var MESSAGE = {
    test: 'test',
    test1: ['test'],
    test2: {
        test: ['test']
    }
};

var nbMessagesReceived = 0, nbClientsDone = 0, nbClients = 10, nbMessages = 10, interval = 100, isEmitter = false;

console.log('Start time : ' + new Date());

if (isEmitter) {
    var timerId = setInterval(function () {
        if (nbMessagesReceived < (nbMessages * nbClients)) {
            for (var i = 0; i < nbClients; i++) {
                MESSAGE.id = Math.floor(Math.random() * 1000000);
                $.post(MESSAGE_URL, MESSAGE, function () {
                    nbMessagesReceived++;
                });
            }
        } else {
            console.log('End time : ' + new Date());
            clearInterval(timerId);
        }
    }, interval);
} else {
    for (var i = 0; i < nbClients; i++) {
        poll();
    }
}

function poll() {
    if (nbMessagesReceived < (nbMessages * nbClients)) {
        $.get(MESSAGE_URL, function () {
            nbMessagesReceived++;
            poll();
        });
    } else {
        console.log('End time : ' + new Date());
    }
}