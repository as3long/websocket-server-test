var CONNECT_MAX = 10000;
var useTimesArray = [];
var report = require('./report');

var i = 0;
while (i < CONNECT_MAX) {
    i++;

    var socket = require('socket.io-client')('http://10.104.128.29:22282');
    socket.on('message', function(data){
        var useTime = Date.now() - parseInt(data);
        useTimesArray.push(useTime);
        if (useTimesArray.length % CONNECT_MAX === 0) {
            report.calculate(useTimesArray);
        }
    });
}
