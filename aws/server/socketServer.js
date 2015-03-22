var io = require('socket.io')();

io.serveClient(false); // TODO : is usefull ?

/* TODO : JSON conf */
var MESSAGE = {
    test: 'test',
    test1: ['test'],
    test2: {
        test: ['test']
    }
};

var nbConnection = 0, isFirstConnection = true, nbMessagesReceived = 0, nbClientsDone = 0, nbClients = 100, nbMessages = 100000, interval = 0, isEmitter = false;

io.on('connection', function(socket){

    nbConnection++;

    if (isFirstConnection) {
        console.log('Start time : ' + new Date());
        if (isEmitter) {
            emit();
        }
        isFirstConnection = false;
    }

    var j = 0;

    if (!isEmitter) {
        socket.on('message', function(){
            j++;
            if (j == nbMessages) {
                nbClientsDone++;
                if (nbClientsDone == nbClients) {
                    console.log('End time : ' + new Date());
                }
            }
        });
    }

    socket.on('disconnect', function(){});
});

function emit() {
    if (isEmitter) {
        var timerId = setInterval(function() {
            if (nbMessagesReceived < nbMessages) {
                MESSAGE.id = Math.floor(Math.random() * 1000000);
                io.emit('message', MESSAGE);
                nbMessagesReceived++;
            } else {
                console.log('End time : ' + new Date());
                clearInterval(timerId);
            }
        }, interval);
    }
}

io.listen(4002);