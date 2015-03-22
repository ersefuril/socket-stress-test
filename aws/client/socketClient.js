

/* TODO : JSON conf */
var MESSAGE = {
    test: 'test',
    test1: ['test'],
    test2: {
        test: ['test']
    }
};

var nbMessages = 100000, nbClientsDone = 0, interval = 0, isEmitter = true, nbClients = 100;

console.log('Start time : ' + new Date());

for (var j = 0; j < nbClients; j++) {
    createClient();
}

function createClient() {

    var i = 0, socket = io('http://localhost:4002', {forceNew: true});

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
            i++;
            if (i == nbMessages) {
                nbClientsDone++;
                if (nbClients == nbClientsDone) {
                    console.log('End time : ' + new Date());
                }
            }
        });
    }
}