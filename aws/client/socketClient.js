

/* TODO : JSON conf */
var MESSAGE = {
    test: 'test',
    test1: ['test'],
    test2: {
        test: ['test']
    }
};

var nbMessagesReceived = 0, nbMessages = 1000, nbClientsDone = 0, interval = 1000, isEmitter = true, nbClients = 100;

console.log('Start time : ' + new Date());

for (var j = 0; j < nbClients; j++) {
    createClient();
}

function createClient() {

    var i = 0, socket = io('http://localhost:80', {forceNew: true});

    if (isEmitter) {
        var timerId = setInterval(function() {
            if (i < nbMessages) {
                MESSAGE.id = Math.floor(Math.random() * 1000000);
                socket.emit('message', MESSAGE);
                i++;
            } else {
                clearInterval(timerId);
                nbClientsDone++;
                if(nbClientsDone == nbClients) {
                    console.log('End time : ' + new Date());
                }
            }
        }, interval);
    } else {
        socket.on('message', function () {
            nbMessagesReceived++;
            if (nbMessagesReceived == (nbMessages * nbClients)) {
                    console.log('End time : ' + new Date());
            }
        });
    }
}