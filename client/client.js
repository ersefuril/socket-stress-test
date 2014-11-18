function generateClients(nbClient) {
    if(nbClient < 1) { nbClient = 1; };
    console.log("* Generate " + nbClient + " client...");
    // Generate X socket clients
    var i;
    for(i = 0; i < nbClient; i++) {
        generateClient(i);
    };
    console.log("* Finish");

};

function generateClient(i) {
    var socket = io('http://localhost:3001', { forceNew: true });

    socket.on('message', function (message) {
        console.log("Client received message : " + message);
        // socket.emit('disconnect', {});
        socket.disconnect();
    });

};

function start() {
    var nbMessage = $('#nbMessage').val();
    var nbClient = $('#nbClient').val();
    generateClients(nbClient);

    // Start test
    var socket = io('http://localhost:3001', { forceNew: true });
    socket.emit('start', nbMessage);
    socket.close();
}

function killConnections() {
    var socket = io();
    socket.emit('kill');
}



/*
socket.on('disconnect', function () {
    updateConnectionStatus('Disconnected');
});

function askQuestion() {
    socket.emit('question');
}

function launchTest() {

    var nbQuestionAnswered = 0, startTime = new Date().getTime(),
        testTime = getTestTime(), nbIterations = getNbIterations();

    var result = {
        testTime: testTime,
        iterations: []
    };

    askQuestion();

    socket.on('answer', function() {
        nbQuestionAnswered++;
        if ((new Date().getTime() - startTime) < testTime) {
            askQuestion();
        } else {
            result.iterations.push(nbQuestionAnswered);
            showProgress(result.iterations.length, nbIterations);
            if (result.iterations.length == nbIterations) { // end of process
                socket.removeAllListeners('answer');
                showResult(result);
            } else { // new iteration
                startTime = new Date().getTime();
                nbQuestionAnswered = 0;
                askQuestion();
            }
        }
    });
}
*/

/* UI */

/*
function updateConnectionStatus(status) {
    $('#connectionStatus').text(status);
}

function showProgress(currentIteration, nbIterations) {
    $('#result').text('Iteration ' + currentIteration + '/' + nbIterations);
}

function showResult(result) {
    var sum = 0;
    for(var i in result.iterations) { sum += result.iterations[i]; }
    $('#result').text('Average of number of questions answered in ' + (result.testTime/1000) + ' seconds : ' + sum / result.iterations.length);
}

function getNbIterations() {
    return parseInt($('#nbIterations').val());
}

function getTestTime() {
    return parseInt($('#testTime').val()) * 1000;
}
*/