var socket = io('http://localhost:3004');

socket.on('connected', function () {
   updateConnectionStatus('Connected');
});

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
                socket.close();
                showResult(result);
            } else { // new iteration
                startTime = new Date().getTime();
                nbQuestionAnswered = 0;
                askQuestion();
            }
        }
    });
}

/* UI */

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