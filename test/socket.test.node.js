var CONNECT_MAX = 2000;
var useTimesArray = [];
var report = require('./report');

var i = 0;
while (i < CONNECT_MAX) {
    i++;

    var socket = require('socket.io-client')('http://localhost:22282');
    socket.on('message', function(data){
        var useTime = Date.now() - parseInt(data);
        useTimesArray.push(useTime);
        if (useTimesArray.length % CONNECT_MAX === 0) {
            report.calculate(useTimesArray);
        }
    });
}
